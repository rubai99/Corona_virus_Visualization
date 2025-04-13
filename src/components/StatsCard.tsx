import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  color: string;
  icon: 'cases' | 'deaths' | 'recovered';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, color, icon }) => {
  const getIconPath = () => {
    switch (icon) {
      case 'cases':
        return 'https://cdn-icons-png.flaticon.com/512/2784/2784487.png';
      case 'deaths':
        return 'https://cdn-icons-png.flaticon.com/512/2784/2784488.png';
      case 'recovered':
        return 'https://cdn-icons-png.flaticon.com/512/2784/2784489.png';
      default:
        return '';
    }
  };

  return (
    <div className="stats-card" style={{ borderColor: color }}>
      <div className="stats-icon" style={{ color }}>
        <img 
          src={getIconPath()} 
          alt={icon} 
          style={{ width: '24px', height: '24px' }}
        />
      </div>
      <div className="stats-content">
        <h3>{title}</h3>
        <p>{value.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StatsCard; 