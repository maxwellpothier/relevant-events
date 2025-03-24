const Home = () => {
	return (
		<div className="flex flex-col items-center justify-start min-h-screen py-12 px-4">
			<h1 className="text-4xl font-bold text-center mb-2 font-sans">
				Relevant Events
			</h1>
			<p className="text-lg text-center text-gray-600 mb-12">
				Answer the following questions to get relevant events for you
			</p>

			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
				<div className="flex flex-col items-center">
					<h2 className="text-xl font-medium mb-4">
						What are your interests?
					</h2>
					<input
						type="text"
						placeholder="e.g., Technology, Music, Sports..."
						className="w-full p-3 border border-gray-300 rounded-md"
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
