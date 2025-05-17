"use client";
import React from 'react';

const Loading = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;
