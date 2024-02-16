// Function that takes a string (text) as input and returns an array of React JSX elements
export default function linkify(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const splitText = text.split(urlRegex);
    return splitText.map((s, i) => {
        if (s.match(urlRegex)) {
            return (
                <a href={s} target="_blank" rel="noopener noreferrer" key={i}>
                    {s}
                </a>
            );
        }
        return <span key={i}>{s}</span>;
    });
}