import { MatchInterface } from "../../types/interfaces";

interface MatchesListProps {
    matches: MatchInterface[];
    setSelectedMatch: (idx: number) => void;
    selectedMatch: number;
}

/**
 * Side Navbar within Matches section. Presents list of matched users and toggles
 * currently selected match for FocusedMatch view.
 *
 * Props: matches, setSelectedMatch, selectedMatch
 *
 * State: None
 *
 * Context: None
 *
 * MatchContainer -> MatchesList -> None
 */
function MatchesList({ matches, setSelectedMatch, selectedMatch }: MatchesListProps) {

    return (<div className="h-full col-span-1 border-2 border-t-0 border-neutral-300">
        <div>
            <h3 className="text-xl py-4 text-center border-b-2 border-neutral-300 shadow-xl font-semibold bg-gradient-to-br from-white to-primary">
                Matches
            </h3>
        </div>
        <div className="overflow-y-scroll w-full bg-white">
                {matches.map((m, idx) =>
                    <div
                    onClick={() => setSelectedMatch(idx)}
                    className={`flex gap-4 items-center w-100 p-2 pr-4 border-b-2 border-base-400 text-center cursor-pointer
                    ${selectedMatch === idx ? "bg-blue-500 text-base-100" : "bg-white font-light"}
                    hover:opacity-70
                    active:opacity-60`}
                    key={idx}
                    >
                        <img src={m.image_urls[0] || './default-profile-pic.png'} className="w-8 h-12 rounded-full border-2 border-primary overflow-clip" />
                        <div className="flex flex-col">
                            <div className="text-md">{m.username}</div>
                            <div className="text-xs">Say hi! 👋</div>
                        </div>
                    </div>)}
        </div>
    </div>)
}

export default MatchesList