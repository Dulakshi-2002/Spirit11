import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "../../redux/slices/playerSlice";

const AdminPlayersPage = () => {
  const dispatch = useDispatch();
  const { players, loading, error } = useSelector((state) => state.players);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    totalRuns: 0,
    ballsFaced: 0,
    inningsBatted: 0,
    wicketsTaken: 0,
    ballsBowled: 0,
    runsConceded: 0,
  });

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "name" || name === "university" ? value : Number(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode && currentPlayer) {
      dispatch(updatePlayer({ id: currentPlayer._id, playerData: formData }));
    } else {
      dispatch(createPlayer(formData));
    }

    resetForm();
  };

  const handleEdit = (player) => {
    setIsEditMode(true);
    setCurrentPlayer(player);
    setFormData({
      name: player.name,
      university: player.university,
      totalRuns: player.totalRuns,
      ballsFaced: player.ballsFaced,
      inningsBatted: player.inningsBatted,
      wicketsTaken: player.wicketsTaken,
      ballsBowled: player.ballsBowled,
      runsConceded: player.runsConceded,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      dispatch(deletePlayer(id));
    }
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentPlayer(null);
    setFormData({
      name: "",
      university: "",
      totalRuns: 0,
      ballsFaced: 0,
      inningsBatted: 0,
      wicketsTaken: 0,
      ballsBowled: 0,
      runsConceded: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Players</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Add New Player
        </button>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Players Table */}
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
                  Batting Stats
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bowling Stats
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
                  Actions
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
              ) : players.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    No players found. Add some players to get started.
                  </td>
                </tr>
              ) : (
                players.map((player) => (
                  <tr key={player._id}>
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
                        <div>Balls: {player.ballsFaced}</div>
                        <div>Innings: {player.inningsBatted}</div>
                        <div>Avg: {player.battingAverage.toFixed(2)}</div>
                        <div>SR: {player.battingStrikeRate.toFixed(2)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        <div>Wickets: {player.wicketsTaken}</div>
                        <div>Balls: {player.ballsBowled}</div>
                        <div>Runs: {player.runsConceded}</div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(player)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(player._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Player Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditMode ? "Edit Player" : "Add New Player"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Player Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="university"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    University
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Batting Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="totalRuns"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Total Runs
                    </label>
                    <input
                      type="number"
                      id="totalRuns"
                      name="totalRuns"
                      value={formData.totalRuns}
                      onChange={handleChange}
                      min="0"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ballsFaced"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Balls Faced
                    </label>
                    <input
                      type="number"
                      id="ballsFaced"
                      name="ballsFaced"
                      value={formData.ballsFaced}
                      onChange={handleChange}
                      min="0"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inningsBatted"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Innings Batted
                    </label>
                    <input
                      type="number"
                      id="inningsBatted"
                      name="inningsBatted"
                      value={formData.inningsBatted}
                      onChange={handleChange}
                      min="0"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Bowling Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="wicketsTaken"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Wickets Taken
                    </label>
                    <input
                      type="number"
                      id="wicketsTaken"
                      name="wicketsTaken"
                      value={formData.wicketsTaken}
                      onChange={handleChange}
                      min="0"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ballsBowled"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Balls Bowled
                    </label>
                    <input
                      type="number"
                      id="ballsBowled"
                      name="ballsBowled"
                      value={formData.ballsBowled}
                      onChange={handleChange}
                      min="0"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="runsConceded"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Runs Conceded
                    </label>
                    <input
                      type="number"
                      id="runsConceded"
                      name="runsConceded"
                      value={formData.runsConceded}
                      onChange={handleChange}
                      min="0"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {isEditMode ? "Update Player" : "Add Player"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlayersPage;
