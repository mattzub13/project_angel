interface CategoryIconProps {
  category: string;
  className?: string;
}

const CategoryIcon = ({ category, className = "" }: CategoryIconProps) => {
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'restaurante':
        return '🍽️';
      case 'cafetería':
        return '☕';
      case 'heladería':
        return '🍦';
      case 'tecnología':
        return '💻';
      case 'retail':
        return '🛍️';
      case 'servicios':
        return '🔧';
      case 'salud':
        return '🏥';
      case 'automotriz':
        return '🚗';
      case 'educación':
        return '📚';
      case 'turismo':
        return '✈️';
      case 'construcción':
        return '🏗️';
      case 'agricultura':
        return '🌾';
      case 'textil':
        return '👕';
      case 'belleza':
        return '💄';
      case 'deportes':
        return '⚽';
      default:
        return '🏢';
    }
  };

  return (
    <div className={`text-3xl ${className}`}>
      {getIcon(category)}
    </div>
  );
};

export default CategoryIcon; 