import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

// Validation schema
const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    mobile: yup.string()
        .required('Mobile number is required')
        .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError('');

        try {
            console.log('Register data:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            // redirect or show success message
        } catch (error) {
            setSubmitError(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4 card-border" style={{ width: '400px' }}>
                <div className="card-body">
                    <h2 className="text-center mb-2 font-size-larger primar-color">Create Account<span className="light-pink-color">!</span></h2>

                    {submitError && (
                        <div className="alert alert-danger" role="alert">
                            {submitError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3">
                            <label className="form-label">Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Your name"
                                {...register('name')}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email <span className="text-danger">*</span></label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="you@example.com"
                                {...register('email')}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                                placeholder="Enter 10-digit mobile number"
                                {...register('mobile')}
                            />
                            {errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Create a password"
                                    {...register('password')}
                                />
                                <span className="input-group-text bg-transparent rounded-end" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                            {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
                        </div>

                        <div className="d-grid mb-3">
                            <button
                                type="submit"
                                className="btn signin-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Register'}
                            </button>
                        </div>

                        <p className="text-center font-size-medium">
                            Already have an account? <Link to="/">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
