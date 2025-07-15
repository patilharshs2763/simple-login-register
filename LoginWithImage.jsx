import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import loginImage from '../../Images/LoginImage.png'
const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError('');

        try {
            console.log('Login data:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            setSubmitError(error.message || 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="d-flex card p-0 card-border w-100 flex-column flex-md-row" style={{ maxWidth: '800px' }}>
                <div className="flex-md-grow-1 p-0 d-none d-md-block">
                    <img
                        src={loginImage}
                        alt="Login visual"
                        className="img-fluid "
                        style={{ objectFit: 'cover', width: '400px', height: '400px', borderTopLeftRadius: '0.25rem', borderBottomLeftRadius: '0.25rem', }}
                    />
                </div>

                <div
                    className="flex-md-grow-1 p-4 signin-form"
                >
                    <h2 className="text-center mb-2 font-size-larger primar-color">Welcome back<span className="light-pink-color">!</span></h2>

                    {submitError && (
                        <div className="alert alert-danger" role="alert">
                            {submitError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="you@mantine.dev"
                                {...register('email')}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email.message}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Your password"
                                    {...register('password')}
                                />
                                <span
                                    className="input-group-text bg-transparent rounded-end"
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                            {errors.password && (
                                <div className="invalid-feedback d-block">{errors.password.message}</div>
                            )}
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div></div>
                            <a href="/forgot-password" className="text-decoration-none">Forgot password?</a>
                        </div>

                        <div className="d-grid mb-2">
                            <button
                                type="submit"
                                className="btn signin-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>

                        <p className="text-center mb-4 font-size-medium second-primary-color ">
                            {/* <span className='font-size-small'>OR</span><br /> */}
                            Do not have an account yet? <Link to="/signup">Create account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
