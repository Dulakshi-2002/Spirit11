import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../../redux/slices/playerSlice";
import { getUserTeam, addPlayerToTeam } from "../../redux/slices/teamSlice";

const PlayersPage = () => {
  const dispatch = useDispatch();
  const { players, loading } = useSelector((state) => state.players);
  const { team, loading: teamLoading } = useSelector((state) => state.team);
  const { user } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    university: "",
    sortBy: "points",
    sortOrder: "desc",
  });

  useEffect(() => {
    dispatch(getPlayers());
    dispatch(getUserTeam());
  }, [dispatch]);

  // Filter and sort players
  const filteredPlayers = players
    .filter((player) => {
      // Text search
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.university.toLowerCase().includes(searchTerm.toLowerCase());

      // University filter
      const matchesUniversity =
        filters.university === "" || player.university === filters.university;

      return matchesSearch && matchesUniversity;
    })
    .sort((a, b) => {
      const sortValue = filters.sortOrder === "asc" ? 1 : -1;
      return (a[filters.sortBy] - b[filters.sortBy]) * sortValue;
    });

  // Get unique universities
  const universities = [...new Set(players.map((player) => player.university))];

  // Check if player is already in team
  const isPlayerInTeam = (playerId) => {
    return team && team.players.some((p) => p.player._id === playerId);
  };

  // Handle adding player to team
  const handleAddPlayer = (playerId) => {
    if (!team) {
      alert("Please create a team first!");
      return;
    }

    if (team.players.length >= 11) {
      alert("Your team already has 11 players!");
      return;
    }

    if (isPlayerInTeam(playerId)) {
      alert("This player is already in your team!");
      return;
    }

    const player = players.find((p) => p._id === playerId);
    if (user.budget < player.value) {
      alert("You do not have enough budget to add this player!");
      return;
    }

    dispatch(addPlayerToTeam(playerId));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Players</h1>
        <div className="mt-2 md:mt-0 text-sm">
          <span className="font-medium text-purple-600">Budget: </span>
          <span className="font-bold">₹{user?.budget?.toLocaleString()}</span>
          {team && (
            <>
              <span className="mx-2">|</span>
              <span className="font-medium text-green-600">Players: </span>
              <span className="font-bold">{team.players.length}/11</span>
            </>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name or university"
              className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="university"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              University
            </label>
            <select
              id="university"
              className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={filters.university}
              onChange={(e) =>
                setFilters({ ...filters, university: e.target.value })
              }
            >
              <option value="">All Universities</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="sortBy"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort By
            </label>
            <div className="flex space-x-2">
              <select
                id="sortBy"
                className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
              >
                <option value="points">Points</option>
                <option value="value">Value</option>
                <option value="totalRuns">Total Runs</option>
                <option value="wicketsTaken">Wickets</option>
                <option value="battingAverage">Batting Avg</option>
                <option value="economyRate">Economy</option>
              </select>

              <button
                className="p-2 rounded border border-gray-300"
                onClick={() =>
                  setFilters({
                    ...filters,
                    sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
                  })
                }
              >
                {filters.sortOrder === "asc" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Players List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Player
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
                  Batting
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bowling
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Points
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Value
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    Loading players...
                  </td>
                </tr>
              ) : filteredPlayers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    No players found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredPlayers.map((player) => (
                  <tr
                    key={player._id}
                    className={isPlayerInTeam(player._id) ? "bg-green-50" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {player.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {player.university}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        <div>Runs: {player.totalRuns}</div>
                        <div>Avg: {player.battingAverage.toFixed(2)}</div>
                        <div>SR: {player.battingStrikeRate.toFixed(2)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        <div>Wickets: {player.wicketsTaken}</div>
                        <div>SR: {player.bowlingStrikeRate.toFixed(2)}</div>
                        <div>Econ: {player.economyRate.toFixed(2)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {player.points.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{player.value.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {isPlayerInTeam(player._id) ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          In Team
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAddPlayer(player._id)}
                          disabled={teamLoading || user.budget < player.value}
                          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {user.budget < player.value
                            ? "Too Expensive"
                            : "Add to Team"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
