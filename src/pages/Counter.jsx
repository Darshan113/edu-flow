import { useReducer } from "react";


function counterReducer(state, action) {
    switch (action.type) {
        case 'incr':
            return { count: state.count + 1 }
        case 'decr':
            return { count: state.count - 1 }
        case 'reset':
            return { count: 0 }
        default:
            break;
    }
}

export default function Counter() {
    const initialState = {count: 0}
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <div className="p-6 bg-gray-50 rounded shadow text-center space-y-4">
            <h2 className="text-xl font-bold">Counter: {state.count}</h2>
            <div className="space-x-3">
                <button
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                    onClick={() => dispatch({ type: "incr" })}
                >
                    + Increment
                </button>
                <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => dispatch({ type: "decr" })}
                >
                    - Decrement
                </button>
                <button
                    className="px-3 py-1 bg-gray-600 text-white rounded"
                    onClick={() => dispatch({ type: "reset" })}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}