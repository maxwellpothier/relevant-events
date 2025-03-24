"use client";

import {questions} from "@/data/questions";
import {FormValues} from "@/types";
import {useState, useEffect} from "react";
import {UseFormReturn} from "react-hook-form";

const QuestionFlow = ({hookForm}: {hookForm: UseFormReturn<FormValues>}) => {
	const [step, setStep] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const step = sessionStorage.getItem("step");
		if (step) {
			setStep(parseInt(step));
		}
		const type = sessionStorage.getItem("type");
		if (type) {
			hookForm.setValue("type", type);
		}
		const location = sessionStorage.getItem("location");
		if (location) {
			hookForm.setValue("location", location);
		}
		const date = sessionStorage.getItem("date");
		if (date) {
			hookForm.setValue("date", date);
		}
		const price = sessionStorage.getItem("price");
		if (price) {
			hookForm.setValue("price", price);
		}
		setIsLoading(false);
	}, [hookForm]);

	const handleNext = () => {
		sessionStorage.setItem("step", `${step + 1}`);
		if (step < questions.length - 1) {
			setStep(step + 1);
		}
	};

	const handleBack = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};

	const handleChange = (value: string) => {
		sessionStorage.setItem(questions[step].id, value);
	};

	if (isLoading) {
		return <div className="w-full max-w-md p-6">Loading...</div>;
	}

	return (
		<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
			<div className="text-center text-sm text-gray-500 mb-3">
				Question {step + 1} of {questions.length}
			</div>
			<div className="flex flex-col items-center">
				<h2 className="text-xl font-medium mb-4">
					{questions[step].text}
				</h2>
				<select
					{...hookForm.register(questions[step].id)}
					onChange={e => handleChange(e.target.value)}
					className="w-full p-3 border border-gray-300 rounded-md"
					defaultValue="">
					{questions[step].options?.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
			<div className="flex justify-between mt-6">
				<div>
					{step > 0 ? (
						<button
							onClick={handleBack}
							className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
							Back
						</button>
					) : (
						<div></div>
					)}
				</div>
				<div>
					{step < questions.length - 1 && (
						<button
							onClick={handleNext}
							className="px-4 py-2 bg-blue-500 text-white rounded-md">
							Next
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuestionFlow;
