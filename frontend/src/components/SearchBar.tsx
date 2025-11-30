import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceCategories } from '../data/services';
import { useLocalePath } from '../hooks/useLocalePath';
import { trackMetaEvent } from '../utils/metaPixel';
import { trackAnalyticsEvent } from '../utils/analytics';
import './SearchBar.css';

type SearchSuggestion = {
  id: string;
  label: string;
  category: string;
  path: string;
};

interface Props {
  onNavigate?: () => void;
  autoFocus?: boolean;
}

const MAX_SUGGESTIONS = 6;

const buildSuggestions = (query: string): SearchSuggestion[] => {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  const matchedServices = serviceCategories.flatMap((category) =>
    category.subServices
      .filter((service) =>
        `${service.name} ${service.description}`.toLowerCase().includes(normalized)
      )
      .map((service) => ({
        id: `${category.id}-${service.id}`,
        label: service.name,
        category: category.name,
        path: `/services/${category.slug}/${service.slug}`
      }))
  );

  return matchedServices.slice(0, MAX_SUGGESTIONS);
};

export const SearchBar = ({ onNavigate, autoFocus }: Props) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const buildPath = useLocalePath();

  const suggestions = useMemo(() => buildSuggestions(query), [query]);
  const hasQuery = query.trim().length > 0;

  const sendTracking = (term: string, action: string) => {
    const payload = { search_term: term, search_action: action };

    trackMetaEvent('Search', payload);
    trackAnalyticsEvent('search', payload);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const term = query.trim();

    if (!term) return;

    sendTracking(term, 'submit');
    navigate(buildPath(`/services?q=${encodeURIComponent(term)}`));
    onNavigate?.();
    setIsFocused(false);
  };

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    sendTracking(query || suggestion.label, 'suggestion_select');
    navigate(buildPath(suggestion.path));
    setQuery('');
    onNavigate?.();
    setIsFocused(false);
  };

  return (
    <div className="search-bar" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <form className="search-form" role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services"
          aria-label="Search services"
          autoFocus={autoFocus}
        />
        <button type="submit" aria-label="Search">
          🔍
        </button>
      </form>
      {isFocused && hasQuery && (
        <div className="search-suggestions" role="listbox">
          {suggestions.length === 0 && <div className="muted">No services match that search.</div>}
          {suggestions.map((suggestion) => (
            <button
              type="button"
              className="suggestion"
              key={suggestion.id}
              role="option"
              onMouseDown={() => handleSuggestionSelect(suggestion)}
            >
              <div className="suggestion-title">{suggestion.label}</div>
              <div className="suggestion-meta">{suggestion.category}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
