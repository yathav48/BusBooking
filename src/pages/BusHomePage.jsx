import BusSearchBar from "../component/BusSearchBar";

export default function Home() {
    return (
        <div className="homepage-layout">
            <div className="homepage-bg">
                <div>
                <div className="header">
                    <h1>india's no:1 online<br /> bus ticket booking site</h1>
                </div>
                </div>
            </div>
            <BusSearchBar />
        </div>
    )
}