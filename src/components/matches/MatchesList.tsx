import { MatchInterface } from "../../types/interfaces";

interface MatchesListProps {
    matches: MatchInterface[];
    setSelectedMatch: (idx: number) => void;
    selectedMatch: number;
}

function MatchesList({ matches, setSelectedMatch, selectedMatch }: MatchesListProps) {


    return (<div className="h-full col-span-1 border-2 border-t-0 border-neutral-600">
        <div>
            <h3 className="text-xl py-4 text-center border-b-2 border-neutral-600 shadow-xl bg-neutral-200 font-semibold">
                Matches
            </h3>
        </div>
        <div className="overflow-y-scroll w-full">
                {matches.map((m, idx) =>
                    <div
                    onClick={() => setSelectedMatch(idx)}
                    className={`flex justify-between items-center w-100 p-2 pr-4 border-b-2 border-base-400 text-center text-sm cursor-pointer
                    ${selectedMatch === idx ? "bg-blue-500 text-base-100" : "font-light"}
                    hover:opacity-70
                    active:opacity-60`}
                    key={idx}
                    >
                        <img src={m.image_urls[0]} className="w-8 h-12 rounded-full border-2 border-primary overflow-clip" />
                        <div>{m.username}</div>
                    </div>)}
        </div>
    </div>)
}

export default MatchesList