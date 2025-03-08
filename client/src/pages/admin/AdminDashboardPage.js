import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTournamentSummary } from "../../redux/slices/adminSlice";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { summary, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getTournamentSummary());
  }, [dispatch]);

  if (loading || !summary) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Total Users
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {summary.userCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Total Teams
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {summary.teamCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Complete Teams
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {summary.completeTeamCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Completion Rate
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {summary.teamCount > 0
              ? `${(
                  (summary.completeTeamCount / summary.teamCount) *
                  100
                ).toFixed(1)}%`
              : "0%"}
          </p>
        </div>
      </div>

      {/* Tournament Stats */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Tournament Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">
              Batting Summary
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Total Runs Scored</p>
                <p className="text-2xl font-bold text-gray-900">
                  {summary.playerStats.totalRuns}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Highest Run Scorer</p>
                <p className="text-xl font-bold text-gray-900">
                  {summary.playerStats.highestRunScorer?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {summary.playerStats.highestRunScorer?.runs || 0} runs
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">
              Bowling Summary
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">
                  Total Wickets Taken
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {summary.playerStats.totalWickets}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">
                  Highest Wicket Taker
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {summary.playerStats.highestWicketTaker?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {summary.playerStats.highestWicketTaker?.wickets || 0} wickets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Players */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Top Valued Players
          </h2>

          <div className="space-y-3">
            {summary.topValuedPlayers.map((player, index) => (
              <div
                key={player._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-6">
                    {index + 1}.
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{player.name}</p>
                    <p className="text-xs text-gray-500">{player.university}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    ₹{player.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {player.points.toFixed(1)} pts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Top Point Scorers
          </h2>

          <div className="space-y-3">
            {summary.topPointScorers.map((player, index) => (
              <div
                key={player._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-6">
                    {index + 1}.
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{player.name}</p>
                    <p className="text-xs text-gray-500">{player.university}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {player.points.toFixed(1)} pts
                  </p>
                  <p className="text-xs text-gray-500">
                    ₹{player.value.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
