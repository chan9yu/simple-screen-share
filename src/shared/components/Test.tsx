const dummyText = "타이포그래피: ‘Typography’, 1972. @ㅇ0ㅇ ₩0 〈응♥〉 『힣♪』";

/** Font 적용 테스트 */
export default function Test() {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<span className="font-thin">{dummyText}</span>
			<span className="font-extralight">{dummyText}</span>
			<span className="font-light">{dummyText}</span>
			<span className="font-normal">{dummyText}</span>
			<span className="font-medium">{dummyText}</span>
			<span className="font-semibold">{dummyText}</span>
			<span className="font-bold">{dummyText}</span>
			<span className="font-extrabold">{dummyText}</span>
			<span className="font-black">{dummyText}</span>
		</div>
	);
}
