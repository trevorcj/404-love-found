import "../styles/snapshots.css";

function SunbeamSnapshotsPage() {
  return (
    <main className="snapshots-frame-wrap">
      <iframe
        src="/memory.html"
        title="Sunbeam Snapshots"
        className="snapshots-frame"
      />
    </main>
  );
}

export default SunbeamSnapshotsPage;
