import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Target,
  TrendingUp,
  History,
  ShoppingCart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Vista general",
  },
  { 
    title: "infografias",
    href: "/infografias",
    icon: "FileText",
    description: "infografias"
  },
  {
    title: "Avances",
    href: "/avances",
    icon: TrendingUp,
    description: "Progreso de ventas",
  },
  {
    title: "Metas",
    href: "/metas",
    icon: Target,
    description: "Objetivos por sucursal",
  },
  {
    title: "Registro Ventas",
    href: "/registro",
    icon: ShoppingCart,
    description: "Ventas diarias",
  },
  {
    title: "Historico",
    href: "/historico",
    icon: History,
    description: "Meses anteriores",
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Settings,
    description: "Configuracion",
  },
];

// Context para manejar el estado del sidebar
interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function MobileHeader() {
  const { setIsOpen } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Building2 className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-semibold text-foreground">Sistema Ventas</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="text-foreground"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Abrir menu</span>
      </Button>
    </header>
  );
}

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { isOpen, setIsOpen, isCollapsed, setIsCollapsed } = useSidebar();

  // Cerrar sidebar en mobile al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  // Cerrar sidebar al hacer click fuera en mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 z-50 h-screen border-r border-border bg-sidebar transition-all duration-300",
          // Desktop
          "lg:left-0",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          // Mobile
          "left-0 w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4 lg:h-16">
            {(!isCollapsed || isOpen) && (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-sidebar-foreground">
                    Sistema Ventas
                  </h1>
                  <p className="text-xs text-muted-foreground">Control Total</p>
                </div>
              </div>
            )}
            {isCollapsed && !isOpen && (
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
            {/* Boton cerrar en mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive ? "text-sidebar-primary-foreground" : "text-muted-foreground"
                        )}
                      />
                      {(!isCollapsed || isOpen) && (
                        <div className="flex flex-col">
                          <span>{item.title}</span>
                          <span
                            className={cn(
                              "text-xs",
                              isActive
                                ? "text-sidebar-primary-foreground/70"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.description}
                          </span>
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Collapse Button - solo en desktop */}
          <div className="hidden border-t border-sidebar-border p-3 lg:block">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-muted-foreground hover:text-sidebar-foreground"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  <span>Colapsar</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      <Sidebar />
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          // Mobile: contenido ocupa toda la pantalla con padding top para el header
          "pt-14 lg:pt-0",
          // Desktop: margen izquierdo segun estado del sidebar
          isCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
