import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTeam } from "../../redux/slices/teamSlice";
import { Link } from "react-router-dom";

const BudgetPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { team } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getUserTeam());
  }, [dispatch]);

  // Calculate total spent
  const totalSpent = team ? team.totalValue : 0;
  const totalBudget = 5000000; // Initial budget
  const remainingBudget = user ? user.budget : 0;
  const spentPercentage = (totalSpent / totalBudget) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Budget Management</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-medium">Total Budget</p>
            <p className="text-2xl font-bold">
              ₹{totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium">
              Remaining Budget
            </p>
            <p className="text-2xl font-bold">
              ₹{remainingBudget.toLocaleString()}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">Spent</p>
            <p className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Budget Utilization</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-purple-600 h-4 rounded-full"
              style={{ width: `${spentPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-gray-500">
            <span>0%</span>
            <span>{spentPercentage.toFixed(1)}% used</span>
            <span>100%</span>
          </div>
        </div>

        {team && team.players.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium mb-2">Budget Breakdown</h3>
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
                      Value
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      % of Budget
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {team.players.map(({ player }) => (
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
                        <div className="text-sm font-medium text-gray-900">
                          ₹{player.value.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {((player.value / totalBudget) * 100).toFixed(1)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-2">
              You haven't added any players to your team yet.
            </p>
            <Link
              to="/players"
              className="text-purple-600 hover:text-purple-500 font-medium"
            >
              Browse Players
            </Link>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Budget Tips</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 mr-2 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Balance your team with both high and low-value players.
          </li>
          <li className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 mr-2 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Look for undervalued players with good performance metrics.
          </li>
          <li className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 mr-2 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Don't spend all your budget at once - keep some reserve for later
            adjustments.
          </li>
          <li className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 mr-2 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Consider both batting and bowling performance when selecting
            players.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BudgetPage;
