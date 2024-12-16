// Plancards.js
export function PlanCard({ plan, onSubscribe }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl justify-center">{plan.name}</h2>
        <p className="text-center text-gray-600">{plan.description}</p>
        <div className="text-center my-4">
          <span className="text-4xl font-bold">₹{plan.amount}</span>
          <span className="text-gray-600">/month</span>
        </div>
        <ul className="space-y-2 my-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <div className="card-actions justify-center mt-auto">
          <button 
            className="btn btn-primary btn-wide" 
            onClick={() => onSubscribe(plan)}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
  