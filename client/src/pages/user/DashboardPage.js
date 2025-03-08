import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserTeam } from "../../redux/slices/teamSlice";
import { getPlayers, getPlayerStats } from "../../redux/slices/playerSlice";
import { getLeaderboard } from "../../redux/slices/teamSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { team } = useSelector((state) => state.team);
  const { players, stats } = useSelector((state) => state.players);
  const { leaderboard } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getUserTeam());
    dispatch(getPlayers());
    dispatch(getPlayerStats());
    dispatch(getLeaderboard());
  }, [dispatch]);

  // Get user team rank
  const userTeamRank =
    leaderboard.findIndex((t) => team && t._id === team._id) + 1;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Welcome Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {user?.username}!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-medium">Budget</p>
            <p className="text-2xl font-bold">
              ₹{user?.budget?.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium">Team Status</p>
            <p className="text-2xl font-bold">
              {team
                ? team.isComplete
                  ? "Complete"
                  : `${team.players.length}/11 Players`
                : "No Team Created"}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">Team Rank</p>
            <p className="text-2xl font-bold">
              {team && team.isComplete
                ? userTeamRank > 0
                  ? `#${userTeamRank}`
                  : "Not Ranked"
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/players"
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white rounded-lg p-4 text-center"
          >
            Browse Players
          </Link>
          <Link
            to="/team"
            className="bg-green-600 hover:bg-green-700 transition-colors text-white rounded-lg p-4 text-center"
          >
            Manage Team
          </Link>
          <Link
            to="/leaderboard"
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg p-4 text-center"
          >
            View Leaderboard
          </Link>
          <Link
            to="/budget"
            className="bg-amber-600 hover:bg-amber-700 transition-colors text-white rounded-lg p-4 text-center"
          >
            Check Budget
          </Link>
        </div>
      </div>

      {/* Tournament Stats */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Tournament Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Batting Leaders</h3>
            <div className="space-y-2 overflow-hidden">
              {players
                .sort((a, b) => b.totalRuns - a.totalRuns)
                .slice(0, 5)
                .map((player, index) => (
                  <div
                    key={player._id}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-6">
                        {index + 1}.
                      </span>
                      <span className="font-medium">{player.name}</span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded ml-2">
                        {player.university}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">
                        {player.totalRuns}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">runs</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Bowling Leaders</h3>
            <div className="space-y-2 overflow-hidden">
              {players
                .sort((a, b) => b.wicketsTaken - a.wicketsTaken)
                .slice(0, 5)
                .map((player, index) => (
                  <div
                    key={player._id}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-6">
                        {index + 1}.
                      </span>
                      <span className="font-medium">{player.name}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2">
                        {player.university}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">
                        {player.wicketsTaken}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        wickets
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Teams */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Top Teams</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Team Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Owner
                </th>
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
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.slice(0, 5).map((team, index) => (
                <tr
                  key={team._id}
                  className={
                    team._id === (user?.team?._id || "") ? "bg-purple-50" : ""
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.owner?.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.owner?.university}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {team.totalPoints.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <Link
            to="/leaderboard"
            className="text-purple-600 hover:text-purple-500 font-medium"
          >
            View Full Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
