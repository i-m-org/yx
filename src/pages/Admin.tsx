import { useState, useEffect } from "react";
import { MainLayout } from "@/components/sidebar";
import { useApp } from "@/lib/app-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Lock,
  Building2,
  Users,
  Package,
  Target,
  Megaphone,
  Bell,
  Plus,
  Pencil,
  Trash2,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { NotificacionesTab } from "./admin/NotificacionesTab";
import { cn } from "@/lib/utils";
import type { Sucursal, Empleado, Producto, Meta, OfertaComercial } from "@/lib/types";

const ADMIN_PASSWORD = "789456qrE$&1";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // Check if already authenticated (session storage)
  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin-auth", "true");
      setAuthError("");
    } else {
      setAuthError("Contrasena incorrecta");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin-auth");
    setPasswordInput("");
  };

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4 sm:p-6 lg:min-h-screen lg:p-8">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Acceso Administracion</CardTitle>
              <CardDescription>
                Ingresa la contrasena para acceder al panel de configuracion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contrasena</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setAuthError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="Ingresa la contrasena"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {authError && <p className="text-sm text-destructive">{authError}</p>}
                </div>
                <Button onClick={handleLogin} className="w-full gap-2">
                  <Lock className="h-4 w-4" />
                  Acceder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="border-b border-border bg-card/50 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
              <h1 className="text-xl font-bold text-foreground sm:text-2xl">Panel de Administracion</h1>
              <p className="text-sm text-muted-foreground">
                Configuracion de sucursales, empleados, productos y ofertas
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <Lock className="h-4 w-4" />
              Cerrar Sesion
            </Button>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <Tabs defaultValue="sucursales" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="sucursales" className="gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Sucursales</span>
              </TabsTrigger>
              <TabsTrigger value="empleados" className="gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Empleados</span>
              </TabsTrigger>
              <TabsTrigger value="productos" className="gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Productos</span>
              </TabsTrigger>
              <TabsTrigger value="metas" className="gap-2">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Metas</span>
              </TabsTrigger>
              <TabsTrigger value="ofertas" className="gap-2">
                <Megaphone className="h-4 w-4" />
                <span className="hidden sm:inline">Ofertas</span>
              </TabsTrigger>
              <TabsTrigger value="notificaciones" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notificaciones</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sucursales">
              <SucursalesTab />
            </TabsContent>
            <TabsContent value="empleados">
              <EmpleadosTab />
            </TabsContent>
            <TabsContent value="productos">
              <ProductosTab />
            </TabsContent>
            <TabsContent value="metas">
              <MetasTab />
            </TabsContent>
            <TabsContent value="ofertas">
              <OfertasTab />
            </TabsContent>
            <TabsContent value="notificaciones">
              <NotificacionesTab />
            </TabsContent>
          </Tabs>
        </div>
    </MainLayout>
  );
}

// SUCURSALES TAB
function SucursalesTab() {
  const { sucursales, agregarSucursal, actualizarSucursal, eliminarSucursal } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Sucursal | null>(null);
  const [formNombre, setFormNombre] = useState("");
  const [formTipo, setFormTipo] = useState<"coppel" | "elektra" | "chedraui">("coppel");
  const [formActiva, setFormActiva] = useState(true);

  const resetForm = () => {
    setFormNombre("");
    setFormTipo("coppel");
    setFormActiva(true);
    setEditing(null);
  };

  const handleOpenDialog = (sucursal?: Sucursal) => {
    if (sucursal) {
      setEditing(sucursal);
      setFormNombre(sucursal.nombre);
      setFormTipo(sucursal.tipo);
      setFormActiva(sucursal.activa);
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formNombre) return;
    if (editing) {
      actualizarSucursal(editing.id, { nombre: formNombre, tipo: formTipo, activa: formActiva });
    } else {
      agregarSucursal({ nombre: formNombre, tipo: formTipo, activa: formActiva });
    }
    setDialogOpen(false);
    resetForm();
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "coppel": return "bg-chart-1/20 text-chart-1";
      case "elektra": return "bg-chart-3/20 text-chart-3";
      case "chedraui": return "bg-chart-2/20 text-chart-2";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Gestion de Sucursales</CardTitle>
            <CardDescription>Administra las sucursales del sistema</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Sucursal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? "Editar Sucursal" : "Nueva Sucursal"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nombre</Label>
                  <Input value={formNombre} onChange={(e) => setFormNombre(e.target.value)} placeholder="Ej: Coppel 123" />
                </div>
                <div className="grid gap-2">
                  <Label>Tipo</Label>
                  <Select value={formTipo} onValueChange={(v) => setFormTipo(v as typeof formTipo)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coppel">Coppel</SelectItem>
                      <SelectItem value="elektra">Elektra</SelectItem>
                      <SelectItem value="chedraui">Chedraui</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Activa</Label>
                  <Switch checked={formActiva} onCheckedChange={setFormActiva} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={!formNombre}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sucursales.map((suc) => (
              <TableRow key={suc.id}>
                <TableCell className="font-medium">{suc.nombre}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", getTipoColor(suc.tipo))}>{suc.tipo}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={suc.activa ? "default" : "secondary"}>{suc.activa ? "Activa" : "Inactiva"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(suc)}><Pencil className="h-4 w-4" /></Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar sucursal</AlertDialogTitle>
                        <AlertDialogDescription>Esta seguro? Esta accion no se puede deshacer.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => eliminarSucursal(suc.id)} className="bg-destructive text-destructive-foreground">Eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// EMPLEADOS TAB
function EmpleadosTab() {
  const { empleados, sucursales, agregarEmpleado, actualizarEmpleado, eliminarEmpleado } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Empleado | null>(null);
  const [formNombre, setFormNombre] = useState("");
  const [formSucursal, setFormSucursal] = useState("");
  const [formActivo, setFormActivo] = useState(true);
  const [formFechaIngreso, setFormFechaIngreso] = useState(new Date().toISOString().split("T")[0]);

  const resetForm = () => {
    setFormNombre("");
    setFormSucursal("");
    setFormActivo(true);
    setFormFechaIngreso(new Date().toISOString().split("T")[0]);
    setEditing(null);
  };

  const handleOpenDialog = (empleado?: Empleado) => {
    if (empleado) {
      setEditing(empleado);
      setFormNombre(empleado.nombre);
      setFormSucursal(empleado.sucursalId);
      setFormActivo(empleado.activo);
      setFormFechaIngreso(empleado.fechaIngreso);
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formNombre || !formSucursal) return;
    if (editing) {
      actualizarEmpleado(editing.id, { nombre: formNombre, sucursalId: formSucursal, activo: formActivo, fechaIngreso: formFechaIngreso });
    } else {
      agregarEmpleado({ nombre: formNombre, sucursalId: formSucursal, activo: formActivo, fechaIngreso: formFechaIngreso });
    }
    setDialogOpen(false);
    resetForm();
  };

  const getSucursalNombre = (id: string) => sucursales.find((s) => s.id === id)?.nombre || "Desconocida";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Gestion de Empleados</CardTitle>
            <CardDescription>Administra los vendedores del sistema</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Empleado
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? "Editar Empleado" : "Nuevo Empleado"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nombre completo</Label>
                  <Input value={formNombre} onChange={(e) => setFormNombre(e.target.value)} placeholder="Nombre del empleado" />
                </div>
                <div className="grid gap-2">
                  <Label>Sucursal</Label>
                  <Select value={formSucursal} onValueChange={setFormSucursal}>
                    <SelectTrigger><SelectValue placeholder="Selecciona sucursal" /></SelectTrigger>
                    <SelectContent>
                      {sucursales.map((suc) => (
                        <SelectItem key={suc.id} value={suc.id}>{suc.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Fecha de ingreso</Label>
                  <Input type="date" value={formFechaIngreso} onChange={(e) => setFormFechaIngreso(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Activo</Label>
                  <Switch checked={formActivo} onCheckedChange={setFormActivo} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={!formNombre || !formSucursal}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Sucursal</TableHead>
              <TableHead>Fecha Ingreso</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empleados.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell className="font-medium">{emp.nombre}</TableCell>
                <TableCell>{getSucursalNombre(emp.sucursalId)}</TableCell>
                <TableCell>{new Date(emp.fechaIngreso + "T00:00:00").toLocaleDateString("es-MX")}</TableCell>
                <TableCell>
                  <Badge variant={emp.activo ? "default" : "secondary"}>{emp.activo ? "Activo" : "Inactivo"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(emp)}><Pencil className="h-4 w-4" /></Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar empleado</AlertDialogTitle>
                        <AlertDialogDescription>Esta seguro? Esta accion no se puede deshacer.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => eliminarEmpleado(emp.id)} className="bg-destructive text-destructive-foreground">Eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// PRODUCTOS TAB
function ProductosTab() {
  const { productos, agregarProducto, actualizarProducto, eliminarProducto } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Producto | null>(null);
  const [formNombre, setFormNombre] = useState("");
  const [formDescripcion, setFormDescripcion] = useState("");
  const [formActivo, setFormActivo] = useState(true);

  const resetForm = () => {
    setFormNombre("");
    setFormDescripcion("");
    setFormActivo(true);
    setEditing(null);
  };

  const handleOpenDialog = (producto?: Producto) => {
    if (producto) {
      setEditing(producto);
      setFormNombre(producto.nombre);
      setFormDescripcion(producto.descripcion);
      setFormActivo(producto.activo);
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formNombre) return;
    if (editing) {
      actualizarProducto(editing.id, { nombre: formNombre, descripcion: formDescripcion, activo: formActivo });
    } else {
      agregarProducto({ nombre: formNombre, descripcion: formDescripcion, activo: formActivo });
    }
    setDialogOpen(false);
    resetForm();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Gestion de Productos</CardTitle>
            <CardDescription>Administra los productos del catalogo</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Producto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nombre</Label>
                  <Input value={formNombre} onChange={(e) => setFormNombre(e.target.value)} placeholder="Nombre del producto" />
                </div>
                <div className="grid gap-2">
                  <Label>Descripcion</Label>
                  <Textarea value={formDescripcion} onChange={(e) => setFormDescripcion(e.target.value)} placeholder="Descripcion del producto" rows={3} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Activo</Label>
                  <Switch checked={formActivo} onCheckedChange={setFormActivo} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={!formNombre}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell className="font-medium">{prod.nombre}</TableCell>
                <TableCell className="text-muted-foreground max-w-xs truncate">{prod.descripcion}</TableCell>
                <TableCell>
                  <Badge variant={prod.activo ? "default" : "secondary"}>{prod.activo ? "Activo" : "Inactivo"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(prod)}><Pencil className="h-4 w-4" /></Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar producto</AlertDialogTitle>
                        <AlertDialogDescription>Esta seguro? Esta accion no se puede deshacer.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => eliminarProducto(prod.id)} className="bg-destructive text-destructive-foreground">Eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// METAS TAB
function MetasTab() {
  const { metas, sucursales, productos, agregarMeta, actualizarMeta, eliminarMeta, getMesActual } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Meta | null>(null);
  const [formMes, setFormMes] = useState(getMesActual());
  const [formSucursal, setFormSucursal] = useState("");
  const [formProducto, setFormProducto] = useState("");
  const [formCantidad, setFormCantidad] = useState("");
  const [filtroMes, setFiltroMes] = useState(getMesActual());

  const opcionesMeses = Array.from({ length: 12 }, (_, i) => {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - i + 1);
    const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
    const nombre = fecha.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
    return { value: mes, label: nombre };
  });

  const metasFiltradas = metas.filter((m) => m.mes === filtroMes);

  const resetForm = () => {
    setFormMes(getMesActual());
    setFormSucursal("");
    setFormProducto("");
    setFormCantidad("");
    setEditing(null);
  };

  const handleOpenDialog = (meta?: Meta) => {
    if (meta) {
      setEditing(meta);
      setFormMes(meta.mes);
      setFormSucursal(meta.sucursalId);
      setFormProducto(meta.productoId);
      setFormCantidad(meta.cantidad.toString());
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formMes || !formSucursal || !formProducto || !formCantidad) return;
    if (editing) {
      actualizarMeta(editing.id, { mes: formMes, sucursalId: formSucursal, productoId: formProducto, cantidad: parseInt(formCantidad) });
    } else {
      agregarMeta({ mes: formMes, sucursalId: formSucursal, productoId: formProducto, cantidad: parseInt(formCantidad) });
    }
    setDialogOpen(false);
    resetForm();
  };

  const getSucursalNombre = (id: string) => sucursales.find((s) => s.id === id)?.nombre || "Desconocida";
  const getProductoNombre = (id: string) => productos.find((p) => p.id === id)?.nombre || "Desconocido";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Gestion de Metas</CardTitle>
            <CardDescription>Configura las metas mensuales por sucursal y producto</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Select value={filtroMes} onValueChange={setFiltroMes}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {opcionesMeses.map((mes) => (
                  <SelectItem key={mes.value} value={mes.value}>
                    <span className="capitalize">{mes.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Meta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editing ? "Editar Meta" : "Nueva Meta"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Mes</Label>
                    <Select value={formMes} onValueChange={setFormMes}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {opcionesMeses.map((mes) => (
                          <SelectItem key={mes.value} value={mes.value}><span className="capitalize">{mes.label}</span></SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Sucursal</Label>
                    <Select value={formSucursal} onValueChange={setFormSucursal}>
                      <SelectTrigger><SelectValue placeholder="Selecciona sucursal" /></SelectTrigger>
                      <SelectContent>
                        {sucursales.map((suc) => (
                          <SelectItem key={suc.id} value={suc.id}>{suc.nombre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Producto</Label>
                    <Select value={formProducto} onValueChange={setFormProducto}>
                      <SelectTrigger><SelectValue placeholder="Selecciona producto" /></SelectTrigger>
                      <SelectContent>
                        {productos.map((prod) => (
                          <SelectItem key={prod.id} value={prod.id}>{prod.nombre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Cantidad (meta)</Label>
                    <Input type="number" min="1" value={formCantidad} onChange={(e) => setFormCantidad(e.target.value)} placeholder="Cantidad objetivo" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSubmit} disabled={!formMes || !formSucursal || !formProducto || !formCantidad}>Guardar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sucursal</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead className="text-center">Cantidad</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metasFiltradas.map((meta) => (
              <TableRow key={meta.id}>
                <TableCell className="font-medium">{getSucursalNombre(meta.sucursalId)}</TableCell>
                <TableCell>{getProductoNombre(meta.productoId)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="default">{meta.cantidad}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(meta)}><Pencil className="h-4 w-4" /></Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar meta</AlertDialogTitle>
                        <AlertDialogDescription>Esta seguro? Esta accion no se puede deshacer.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => eliminarMeta(meta.id)} className="bg-destructive text-destructive-foreground">Eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
            {metasFiltradas.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  No hay metas configuradas para este mes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// OFERTAS TAB
function OfertasTab() {
  const { ofertasComerciales, agregarOferta, actualizarOferta, eliminarOferta, getMesActual } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<OfertaComercial | null>(null);
  const [formTitulo, setFormTitulo] = useState("");
  const [formDescripcion, setFormDescripcion] = useState("");
  const [formValor, setFormValor] = useState("");
  const [formFechaInicio, setFormFechaInicio] = useState(getMesActual() + "-01");
  const [formFechaFin, setFormFechaFin] = useState(getMesActual() + "-31");
  const [formActiva, setFormActiva] = useState(true);

  const resetForm = () => {
    setFormTitulo("");
    setFormDescripcion("");
    setFormValor("");
    setFormFechaInicio(getMesActual() + "-01");
    setFormFechaFin(getMesActual() + "-31");
    setFormActiva(true);
    setEditing(null);
  };

  const handleOpenDialog = (oferta?: OfertaComercial) => {
    if (oferta) {
      setEditing(oferta);
      setFormTitulo(oferta.titulo);
      setFormDescripcion(oferta.descripcion);
      setFormValor(oferta.valor);
      setFormFechaInicio(oferta.fechaInicio);
      setFormFechaFin(oferta.fechaFin);
      setFormActiva(oferta.activa);
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formTitulo || !formDescripcion || !formValor) return;
    if (editing) {
      actualizarOferta(editing.id, {
        titulo: formTitulo,
        descripcion: formDescripcion,
        valor: formValor,
        fechaInicio: formFechaInicio,
        fechaFin: formFechaFin,
        activa: formActiva,
      });
    } else {
      agregarOferta({
        titulo: formTitulo,
        descripcion: formDescripcion,
        valor: formValor,
        fechaInicio: formFechaInicio,
        fechaFin: formFechaFin,
        activa: formActiva,
      });
    }
    setDialogOpen(false);
    resetForm();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Ofertas Comerciales</CardTitle>
            <CardDescription>Administra la infografia y ofertas del mes</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Oferta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{editing ? "Editar Oferta" : "Nueva Oferta Comercial"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Titulo</Label>
                  <Input value={formTitulo} onChange={(e) => setFormTitulo(e.target.value)} placeholder="Titulo de la oferta" />
                </div>
                <div className="grid gap-2">
                  <Label>Descripcion</Label>
                  <Textarea value={formDescripcion} onChange={(e) => setFormDescripcion(e.target.value)} placeholder="Descripcion detallada de la oferta" rows={3} />
                </div>
                <div className="grid gap-2">
                  <Label>Valor / Beneficio</Label>
                  <Input value={formValor} onChange={(e) => setFormValor(e.target.value)} placeholder="Ej: 5GB Gratis, $100 Saldo, 2x Recargas" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Fecha inicio</Label>
                    <Input type="date" value={formFechaInicio} onChange={(e) => setFormFechaInicio(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Fecha fin</Label>
                    <Input type="date" value={formFechaFin} onChange={(e) => setFormFechaFin(e.target.value)} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Activa</Label>
                  <Switch checked={formActiva} onCheckedChange={setFormActiva} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={!formTitulo || !formDescripcion || !formValor}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ofertasComerciales.map((oferta) => (
            <Card key={oferta.id} className={cn("relative overflow-hidden", !oferta.activa && "opacity-60")}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{oferta.titulo}</CardTitle>
                  <Badge variant={oferta.activa ? "default" : "secondary"}>
                    {oferta.activa ? "Activa" : "Inactiva"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{oferta.descripcion}</p>
                <div className="mb-3 rounded-lg bg-primary/10 px-3 py-2 text-center">
                  <span className="text-lg font-bold text-primary">{oferta.valor}</span>
                </div>
                <p className="mb-4 text-xs text-muted-foreground">
                  Vigencia: {new Date(oferta.fechaInicio + "T00:00:00").toLocaleDateString("es-MX")} -{" "}
                  {new Date(oferta.fechaFin + "T00:00:00").toLocaleDateString("es-MX")}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenDialog(oferta)}>
                    <Pencil className="mr-1 h-3 w-3" />
                    Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar oferta</AlertDialogTitle>
                        <AlertDialogDescription>Esta seguro? Esta accion no se puede deshacer.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => eliminarOferta(oferta.id)} className="bg-destructive text-destructive-foreground">Eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-accent/50" />
            </Card>
          ))}
          {ofertasComerciales.length === 0 && (
            <Card className="col-span-full p-8 text-center">
              <Megaphone className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No hay ofertas</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Agrega ofertas comerciales para mostrar a los vendedores
              </p>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
