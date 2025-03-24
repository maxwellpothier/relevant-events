"use client";

import {useForm} from "react-hook-form";
import QuestionFlow from "./QuestionFlow";
import {FormValues} from "@/types";
import {getEvents} from "./ticketmaster";

const Home = () => {
	const hookForm = useForm();

	const onSubmit = async (data: FormValues) => {
		const eventData = await getEvents(data);
		console.log(eventData);
	};

	const handleClearForm = () => {
		hookForm.reset();
		sessionStorage.clear();
	};

	return (
		<div className="flex flex-col items-center justify-start min-h-screen py-12 px-4">
			<h1 className="text-4xl font-bold text-center mb-2 font-sans">
				Relevant Events
			</h1>
			<p className="text-lg text-center text-gray-600 mb-12">
				Answer the following questions to get relevant events for you
			</p>

			<form onSubmit={hookForm.handleSubmit(onSubmit)}>
				<QuestionFlow hookForm={hookForm} />
				<div className="flex justify-between mt-4">
					<button
						type="button"
						onClick={handleClearForm}
						className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
						Clear Form
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded-md">
						Submit Anytime
					</button>
				</div>
			</form>
		</div>
	);
};

export default Home;
