import GlassCard from "./GlassCard";

function TableContainer({ children }) {
  return (
    <GlassCard className="overflow-x-auto">
      {children}
    </GlassCard>
  );
}

export default TableContainer;