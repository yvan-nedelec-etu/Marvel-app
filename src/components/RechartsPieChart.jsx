import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { prepareData } from './chart-utils';

// Palette de couleurs pour les segments du pie chart
const COLORS = [
  '#8884d8', // Bleu
  '#82ca9d', // Vert
  '#ffc658', // Jaune
  '#ff7300', // Orange
  '#8dd1e1', // Cyan
  '#d084d0', // Violet
  '#87d068', // Vert clair
  '#ffb347'  // Orange clair
];

/**
 * Composant RechartsPieChart pour afficher un graphique en camembert des capacités
 * @param {Object} data - Objet contenant les capacités du personnage
 * @param {number} width - Largeur du conteneur (optionnel)
 * @param {number} height - Hauteur du conteneur (optionnel)
 */
export default function RechartsPieChart({ data, width = 400, height = 400 }) {
  // Transformer les données avec la fonction utilitaire
  const chartData = prepareData(data);

  // Si pas de données, afficher un message
  if (!chartData || chartData.length === 0) {
    return (
      <div 
        style={{ 
          width, 
          height, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid #eee',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        <p style={{ color: '#666', fontSize: '16px' }}>No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height} style={{ maxWidth: width }}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={80}
          fill="#8884d8"
          stroke="#fff"
          strokeWidth={2}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value, name) => [value, name]}
          labelStyle={{ color: '#666' }}
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: '14px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}