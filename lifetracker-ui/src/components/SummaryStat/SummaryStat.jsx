import React from "react";

export default function SummaryStat({ stat, label, substat }) {
    return (
        <div className="summary-stat">
            <div className="stat-label">{label}</div>
            <div className="primary-statistic">{stat}</div>
            <div className="secondary-statistic">{substat}</div>
        </div>
    );
}
