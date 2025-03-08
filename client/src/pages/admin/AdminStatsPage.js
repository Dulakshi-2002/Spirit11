import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTournamentSummary } from "../../redux/slices/adminSlice";
import { getPlayers } from "../../redux/slices/playerSlice";

const AdminStatsPage = () => {
  const dispatch = useDispatch();
  const { summary, loading } = useSelector((state) => state.admin);
  const { players } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(getTournamentSummary());
    dispatch(getPlayers());
  }, [dispatch]);

  // Calculate university stats
  const universityStats = players.reduce((acc, player) => {
    if (!acc[player.university]) {
      acc[player.university] = {
        playerCount: 0,
        totalRuns: 0,
        totalWickets: 0,
        totalPoints: 0,
      };
    }

    acc[player.university].playerCount += 1;
    acc[player.university].totalRuns += player.totalRuns;
    acc[player.university].totalWickets += player.wicketsTaken;
    acc[player.university].totalPoints += player.points;

    return acc;
  }, {});

  const universityStatsArray = Object.entries(universityStats)
    .map(([university, stats]) => ({
      university,
      ...stats,
      averagePoints: stats.totalPoints / stats.playerCount,
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints);

  if (loading || !summary) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tournament Summary</h1>

      {/* Overall Stats */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Overall Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Total Players</p>
            <p className="text-2xl font-bold text-gray-900">{players.length}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Total Runs</p>
            <p className="text-2xl font-bold text-gray-900">
              {summary.playerStats.totalRuns}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Total Wickets</p>
            <p className="text-2xl font-bold text-gray-900">
              {summary.playerStats.totalWickets}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Universities</p>
            <p className="text-2xl font-bold text-gray-900">
              {Object.keys(universityStats).length}
            </p>
          </div>
        </div>
      </div>

      {/* University Stats */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            University Statistics
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  University
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Players
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Runs
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Wickets
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Points
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Avg Points/Player
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {universityStatsArray.map((stats, index) => (
                <tr key={stats.university}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {stats.university}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {stats.playerCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {stats.totalRuns}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {stats.totalWickets}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {stats.totalPoints.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {stats.averagePoints.toFixed(1)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Player Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Batting Leaders
          </h2>

          <div className="space-y-3">
            {players
              .sort((a, b) => b.totalRuns - a.totalRuns)
              .slice(0, 5)
              .map((player, index) => (
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
                      <p className="text-xs text-gray-500">
                        {player.university}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {player.totalRuns} runs
                    </p>
                    <p className="text-xs text-gray-500">
                      SR: {player.battingStrikeRate.toFixed(1)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Bowling Leaders
          </h2>

          <div className="space-y-3">
            {players
              .sort((a, b) => b.wicketsTaken - a.wicketsTaken)
              .slice(0, 5)
              .map((player, index) => (
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
                      <p className="text-xs text-gray-500">
                        {player.university}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {player.wicketsTaken} wickets
                    </p>
                    <p className="text-xs text-gray-500">
                      Econ: {player.economyRate.toFixed(1)}
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

export default AdminStatsPage;
