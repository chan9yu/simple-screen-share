import Test from "@/shared/components/Test";

export default function HomePage() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-5">
			<h1 className="text-xl">Root Page</h1>
			<Test />
		</div>
	);
}
