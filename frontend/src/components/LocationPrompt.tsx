import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { Locale, SUPPORTED_LOCALES } from '../utils/locale';
import './LocationPrompt.css';

const buildSwitchPath = (pathname: string, targetLocale: Locale) => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return `/${targetLocale}`;
  }
  segments[0] = targetLocale;
  return `/${segments.join('/')}`;
};

export const LocationPrompt = () => {
  const locale = useLocale();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);

  useEffect(() => {
    setSelectedLocale(locale);
  }, [locale]);

  const targetPath = useMemo(() => buildSwitchPath(pathname, selectedLocale), [pathname, selectedLocale]);

  const handleSubmit = () => {
    if (selectedLocale === locale) {
      setIsVisible(false);
      return;
    }
    setIsVisible(false);
    navigate(targetPath, { replace: true });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="location-prompt">
      <div className="location-prompt__content">
        <div>
          <p className="location-prompt__title">Is your location correct?</p>
          <p className="location-prompt__subtitle">Choose your region to see the right pricing and checkout options.</p>
        </div>
        <div className="location-prompt__controls">
          <label>
            Region
            <select value={selectedLocale} onChange={(event) => setSelectedLocale(event.target.value as Locale)}>
              {SUPPORTED_LOCALES.map((value) => (
                <option key={value} value={value}>
                  {value === 'in' ? 'India' : 'USA'}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="primary-button" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPrompt;
