import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { disciplines, categories, getParentDisciplines, getSubDisciplines } from '@/data/disciplines';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Disciplines() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set());

  // Get disciplines organized by category with parent/child hierarchy
  const getDisciplinesByCategory = () => {
    const result: Record<string, typeof disciplines> = {};
    
    Object.keys(categories).forEach(cat => {
      result[cat] = disciplines.filter(d => d.category === cat && !d.parentId);
    });
    
    return result;
  };

  const disciplinesByCategory = getDisciplinesByCategory();

  // Filter by search
  const filterBySearch = (disciplineList: typeof disciplines) => {
    if (!searchQuery) return disciplineList;
    const query = searchQuery.toLowerCase();
    return disciplineList.filter(d => {
      const matchesSelf = d.name.toLowerCase().includes(query);
      const matchesChild = getSubDisciplines(d.id).some(sub => 
        sub.name.toLowerCase().includes(query)
      );
      return matchesSelf || matchesChild;
    });
  };

  const toggleParent = (parentId: string) => {
    setExpandedParents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(parentId)) {
        newSet.delete(parentId);
      } else {
        newSet.add(parentId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    const allParentIds = disciplines.filter(d => !d.parentId && getSubDisciplines(d.id).length > 0).map(d => d.id);
    setExpandedParents(new Set(allParentIds));
  };

  const collapseAll = () => {
    setExpandedParents(new Set());
  };

  // Count total disciplines
  const getTotalCount = () => {
    if (selectedCategory) {
      return disciplines.filter(d => d.category === selectedCategory).length;
    }
    return disciplines.length;
  };

  // Get categories to display
  const categoriesToDisplay = selectedCategory 
    ? { [selectedCategory]: categories[selectedCategory as keyof typeof categories] }
    : categories;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-sport-gradient text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl lg:text-5xl font-bold mb-4">
            Disciplines sportives
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Explorez plus de {disciplines.length} disciplines sportives pratiquées en France,
            organisées par catégorie avec leurs variantes.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher une discipline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Expand/Collapse buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={expandAll}>
              Tout déplier
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll}>
              Tout replier
            </Button>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={!selectedCategory ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            Toutes ({disciplines.length})
          </Button>
          {Object.entries(categories).map(([key, value]) => {
            const count = disciplines.filter(d => d.category === key).length;
            return (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(key)}
              >
                {value.name} ({count})
              </Button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-muted-foreground mb-6">
          {getTotalCount()} discipline{getTotalCount() > 1 ? 's' : ''} trouvée{getTotalCount() > 1 ? 's' : ''}
        </p>

        {/* Categories with disciplines */}
        <div className="space-y-8">
          {Object.entries(categoriesToDisplay).map(([categoryKey, categoryInfo]) => {
            const categoryDisciplines = filterBySearch(disciplinesByCategory[categoryKey] || []);
            
            if (categoryDisciplines.length === 0 && searchQuery) return null;

            return (
              <div key={categoryKey} className="bg-card rounded-2xl border border-border p-6">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <div className={cn(
                    "w-4 h-4 rounded-full",
                    categoryInfo.color
                  )} />
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground">
                    {categoryInfo.name}
                  </h2>
                  <Badge variant="secondary" className="ml-auto">
                    {disciplines.filter(d => d.category === categoryKey).length} disciplines
                  </Badge>
                </div>

                {/* Disciplines grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryDisciplines.map((discipline) => {
                    const subDisciplines = getSubDisciplines(discipline.id).filter(sub =>
                      !searchQuery || sub.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    const hasSubDisciplines = subDisciplines.length > 0;
                    const isExpanded = expandedParents.has(discipline.id);

                    return (
                      <div key={discipline.id} className="space-y-1">
                        {hasSubDisciplines ? (
                          <Collapsible 
                            open={isExpanded} 
                            onOpenChange={() => toggleParent(discipline.id)}
                          >
                            <div className="flex items-center gap-2">
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-auto"
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </Button>
                              </CollapsibleTrigger>
                              <Link
                                to={`/recherche?discipline=${discipline.id}`}
                                className="flex-1 group"
                              >
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                  <span className="text-2xl">{discipline.icon}</span>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                      {discipline.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                      {discipline.clubCount.toLocaleString()} clubs • {subDisciplines.length} variante{subDisciplines.length > 1 ? 's' : ''}
                                    </p>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                </div>
                              </Link>
                            </div>

                            <CollapsibleContent>
                              <div className="ml-8 mt-1 space-y-1 border-l-2 border-border pl-3">
                                {subDisciplines.map((sub) => (
                                  <Link
                                    key={sub.id}
                                    to={`/recherche?discipline=${sub.id}`}
                                    className="group block"
                                  >
                                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                      <span className="text-lg">{sub.icon}</span>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                          {sub.name}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                          {sub.clubCount.toLocaleString()} clubs
                                        </p>
                                      </div>
                                      <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <Link
                            to={`/recherche?discipline=${discipline.id}`}
                            className="group block"
                          >
                            <div className="flex items-center gap-3 p-2 pl-8 rounded-lg hover:bg-muted/50 transition-colors">
                              <span className="text-2xl">{discipline.icon}</span>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                  {discipline.name}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                  {discipline.clubCount.toLocaleString()} clubs
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
