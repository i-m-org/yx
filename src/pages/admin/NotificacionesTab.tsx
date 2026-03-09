/**
 * NotificacionesTab.tsx
 * Panel de administración para enviar notificaciones PWA,
 * alertas y mensajes a los usuarios instalados.
 */
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  BellOff,
  Send,
  AlertTriangle,
  Info,
  CheckCircle2,
  Megaphone,
  Trash2,
  RefreshCw,
  Smartphone,
  BellRing,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────
type TipoNotificacion = "info" | "alerta" | "exito" | "urgente" | "mensaje";

interface NotificacionEnviada {
  id: string;
  titulo: string;
  cuerpo: string;
  tipo: TipoNotificacion;
  url?: string;
  timestamp: string;
  entregada: boolean;
}

const TIPO_CONFIG: Record<
  TipoNotificacion,
  { label: string; icon: React.ElementType; color: string; badge: string }
> = {
  info: {
    label: "Información",
    icon: Info,
    color: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  alerta: {
    label: "Alerta",
    icon: AlertTriangle,
    color: "text-yellow-400",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
  exito: {
    label: "Éxito",
    icon: CheckCircle2,
    color: "text-green-400",
    badge: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  urgente: {
    label: "Urgente",
    icon: AlertTriangle,
    color: "text-red-400",
    badge: "bg-red-500/20 text-red-300 border-red-500/30",
  },
  mensaje: {
    label: "Mensaje",
    icon: Megaphone,
    color: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
};

const HISTORIAL_KEY = "notif-historial";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function cargarHistorial(): NotificacionEnviada[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORIAL_KEY) || "[]");
  } catch {
    return [];
  }
}

function guardarHistorial(items: NotificacionEnviada[]) {
  localStorage.setItem(HISTORIAL_KEY, JSON.stringify(items.slice(0, 50)));
}

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────
export function NotificacionesTab() {
  // Estado de permisos
  const [permiso, setPermiso] = useState<NotificationPermission>("default");
  const [swActivo, setSwActivo] = useState(false);

  // Formulario
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [tipo, setTipo] = useState<TipoNotificacion>("info");
  const [url, setUrl] = useState("/");
  const [vibrar, setVibrar] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{ ok: boolean; msg: string } | null>(null);

  // Historial
  const [historial, setHistorial] = useState<NotificacionEnviada[]>([]);

  // Plantillas rápidas
  const [plantillaActiva, setPlantillaActiva] = useState<string | null>(null);

  // ── Inicialización ────────────────────────────────────────────────────────
  useEffect(() => {
    if ("Notification" in window) {
      setPermiso(Notification.permission);
    }
    navigator.serviceWorker?.ready.then(() => setSwActivo(true)).catch(() => {});
    setHistorial(cargarHistorial());
  }, []);

  // ── Solicitar permiso ─────────────────────────────────────────────────────
  const solicitarPermiso = useCallback(async () => {
    if (!("Notification" in window)) {
      setResultado({ ok: false, msg: "Este navegador no soporta notificaciones" });
      return;
    }
    const perm = await Notification.requestPermission();
    setPermiso(perm);
    if (perm === "granted") {
      setResultado({ ok: true, msg: "✓ Permiso concedido" });
    } else if (perm === "denied") {
      setResultado({ ok: false, msg: "✗ Permiso denegado por el usuario" });
    }
  }, []);

  // ── Enviar notificación ───────────────────────────────────────────────────
  const enviarNotificacion = useCallback(async () => {
    if (!titulo.trim()) {
      setResultado({ ok: false, msg: "El título es obligatorio" });
      return;
    }
    if (permiso !== "granted") {
      setResultado({ ok: false, msg: "Primero debes conceder el permiso de notificaciones" });
      return;
    }

    setEnviando(true);
    setResultado(null);

    const iconMap: Record<TipoNotificacion, string> = {
      info: "/icons/icon-192.svg",
      alerta: "/icons/icon-192.svg",
      exito: "/icons/icon-192.svg",
      urgente: "/icons/icon-192.svg",
      mensaje: "/icons/icon-192.svg",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      body: cuerpo || undefined,
      icon: iconMap[tipo],
      badge: "/icons/icon-72.svg",
      // vibrate no está en TS pero sí en la spec W3C para SW notifications
      ...(vibrar ? { vibrate: [200, 100, 200] } : {}),
      tag: `ventas-${tipo}-${Date.now()}`,
      data: { url: url || "/" },
      requireInteraction: tipo === "urgente",
      actions: [
        { action: "open", title: "Ver" },
        { action: "close", title: "Cerrar" },
      ],
    };

    let entregada = false;

    try {
      // Preferir SW para notificación persistente
      if (swActivo) {
        const reg = await navigator.serviceWorker.ready;
        await reg.showNotification(titulo, options);
        entregada = true;
      } else {
        // Fallback: Notificación directa
        new Notification(titulo, options);
        entregada = true;
      }

      // Guardar en historial
      const item: NotificacionEnviada = {
        id: `n-${Date.now()}`,
        titulo,
        cuerpo,
        tipo,
        url,
        timestamp: new Date().toISOString(),
        entregada,
      };
      const nuevoHistorial = [item, ...historial];
      setHistorial(nuevoHistorial);
      guardarHistorial(nuevoHistorial);

      setResultado({ ok: true, msg: "✓ Notificación enviada correctamente" });

      // Limpiar formulario
      setTitulo("");
      setCuerpo("");
      setPlantillaActiva(null);

    } catch (err) {
      console.error("[Notif] Error:", err);
      setResultado({ ok: false, msg: `Error al enviar: ${String(err)}` });
    } finally {
      setEnviando(false);
      setTimeout(() => setResultado(null), 4000);
    }
  }, [titulo, cuerpo, tipo, url, vibrar, permiso, swActivo, historial]);

  // ── Aplicar plantilla ─────────────────────────────────────────────────────
  const aplicarPlantilla = (id: string) => {
    setPlantillaActiva(id);
    switch (id) {
      case "meta-diaria":
        setTitulo("📊 Revisión de Meta Diaria");
        setCuerpo("Recuerda revisar el avance de tus ventas del día. ¡Cada venta cuenta!");
        setTipo("info");
        setUrl("/avances");
        break;
      case "alerta-cierre":
        setTitulo("⚠️ Alerta: Cierre de Mes");
        setCuerpo("Quedan pocos días para el cierre del mes. ¡Impulsa tus ventas ahora!");
        setTipo("urgente");
        setUrl("/dashboard");
        break;
      case "nueva-oferta":
        setTitulo("🎯 Nueva Oferta Comercial");
        setCuerpo("Se ha publicado una nueva oferta comercial. Consúltala en la sección Infografías.");
        setTipo("mensaje");
        setUrl("/infografias");
        break;
      case "felicitacion":
        setTitulo("🏆 ¡Felicitaciones!");
        setCuerpo("Has alcanzado tu meta del mes. ¡Excelente trabajo!");
        setTipo("exito");
        setUrl("/avances");
        break;
      case "reunion":
        setTitulo("📅 Recordatorio de Reunión");
        setCuerpo("Reunión de equipo programada. Prepara tu reporte de avances.");
        setTipo("alerta");
        setUrl("/");
        break;
    }
  };

  const limpiarHistorial = () => {
    setHistorial([]);
    localStorage.removeItem(HISTORIAL_KEY);
  };

  const TipoIcon = TIPO_CONFIG[tipo].icon;

  return (
    <div className="space-y-6">

      {/* Estado de permisos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              {permiso === "granted" ? (
                <Bell className="h-5 w-5 text-green-400" />
              ) : permiso === "denied" ? (
                <BellOff className="h-5 w-5 text-red-400" />
              ) : (
                <BellRing className="h-5 w-5 text-yellow-400" />
              )}
              <div>
                <p className="text-sm font-medium">Permiso de Notificaciones</p>
                <p className={cn("text-xs", {
                  "text-green-400": permiso === "granted",
                  "text-red-400": permiso === "denied",
                  "text-yellow-400": permiso === "default",
                })}>
                  {permiso === "granted" ? "Concedido" : permiso === "denied" ? "Denegado" : "No solicitado"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <Smartphone className={cn("h-5 w-5", swActivo ? "text-green-400" : "text-muted-foreground")} />
              <div>
                <p className="text-sm font-medium">Service Worker</p>
                <p className={cn("text-xs", swActivo ? "text-green-400" : "text-muted-foreground")}>
                  {swActivo ? "Activo" : "No disponible"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Enviadas (historial)</p>
                <p className="text-xs text-muted-foreground">{historial.length} notificaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Panel izquierdo: Formulario */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Send className="h-4 w-4 text-primary" />
                Enviar Notificación
              </CardTitle>
              <CardDescription>
                Envía notificaciones push, alertas o mensajes a los dispositivos con la app instalada.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* Acción de permiso */}
              {permiso !== "granted" && (
                <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-300">Permiso requerido</p>
                    <p className="text-xs text-yellow-400/80 mt-0.5">
                      Necesitas conceder permiso para enviar notificaciones.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20"
                      onClick={solicitarPermiso}
                    >
                      <Bell className="h-3 w-3 mr-1" />
                      Solicitar permiso
                    </Button>
                  </div>
                </div>
              )}

              {/* Tipo */}
              <div className="space-y-1.5">
                <Label>Tipo de notificación</Label>
                <Select value={tipo} onValueChange={(v) => setTipo(v as TipoNotificacion)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(TIPO_CONFIG) as TipoNotificacion[]).map((t) => {
                      const cfg = TIPO_CONFIG[t];
                      const Icon = cfg.icon;
                      return (
                        <SelectItem key={t} value={t}>
                          <span className="flex items-center gap-2">
                            <Icon className={cn("h-4 w-4", cfg.color)} />
                            {cfg.label}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Título */}
              <div className="space-y-1.5">
                <Label htmlFor="notif-titulo">Título *</Label>
                <Input
                  id="notif-titulo"
                  placeholder="Ej: ¡Nueva meta disponible!"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  maxLength={64}
                />
                <p className="text-xs text-muted-foreground text-right">{titulo.length}/64</p>
              </div>

              {/* Cuerpo */}
              <div className="space-y-1.5">
                <Label htmlFor="notif-cuerpo">Mensaje</Label>
                <Textarea
                  id="notif-cuerpo"
                  placeholder="Escribe el contenido de la notificación..."
                  value={cuerpo}
                  onChange={(e) => setCuerpo(e.target.value)}
                  rows={3}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground text-right">{cuerpo.length}/200</p>
              </div>

              {/* URL destino */}
              <div className="space-y-1.5">
                <Label htmlFor="notif-url">URL destino al hacer clic</Label>
                <Select value={url} onValueChange={setUrl}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="/">Dashboard principal</SelectItem>
                    <SelectItem value="/avances">Avances del equipo</SelectItem>
                    <SelectItem value="/registro">Registro de ventas</SelectItem>
                    <SelectItem value="/metas">Metas</SelectItem>
                    <SelectItem value="/historico">Histórico</SelectItem>
                    <SelectItem value="/infografias">Infografías</SelectItem>
                    <SelectItem value="/admin">Administración</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vibración */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Vibración en dispositivos móviles</Label>
                  <p className="text-xs text-muted-foreground">Activa el vibrador al recibir la notificación</p>
                </div>
                <Switch checked={vibrar} onCheckedChange={setVibrar} />
              </div>

              {/* Resultado */}
              {resultado && (
                <div className={cn("rounded-md px-3 py-2 text-sm flex items-center gap-2", {
                  "bg-green-500/15 text-green-300 border border-green-500/30": resultado.ok,
                  "bg-red-500/15 text-red-300 border border-red-500/30": !resultado.ok,
                })}>
                  {resultado.ok
                    ? <CheckCircle2 className="h-4 w-4 shrink-0" />
                    : <AlertTriangle className="h-4 w-4 shrink-0" />}
                  {resultado.msg}
                </div>
              )}

              {/* Botón enviar */}
              <Button
                className="w-full gap-2"
                onClick={enviarNotificacion}
                disabled={enviando || !titulo.trim() || permiso !== "granted"}
              >
                {enviando ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {enviando ? "Enviando..." : "Enviar notificación"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Panel derecho: Plantillas + Historial */}
        <div className="space-y-4">

          {/* Plantillas rápidas */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-primary" />
                Plantillas rápidas
              </CardTitle>
              <CardDescription>
                Selecciona una plantilla para rellenar el formulario automáticamente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { id: "meta-diaria", label: "📊 Revisión de Meta Diaria", tipo: "info" as TipoNotificacion },
                { id: "alerta-cierre", label: "⚠️ Alerta Cierre de Mes", tipo: "urgente" as TipoNotificacion },
                { id: "nueva-oferta", label: "🎯 Nueva Oferta Comercial", tipo: "mensaje" as TipoNotificacion },
                { id: "felicitacion", label: "🏆 Felicitación de Meta", tipo: "exito" as TipoNotificacion },
                { id: "reunion", label: "📅 Recordatorio de Reunión", tipo: "alerta" as TipoNotificacion },
              ].map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => aplicarPlantilla(pt.id)}
                  className={cn(
                    "w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors",
                    "hover:bg-muted/50 flex items-center justify-between gap-3",
                    plantillaActiva === pt.id
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border/50 text-foreground"
                  )}
                >
                  <span>{pt.label}</span>
                  <Badge
                    variant="outline"
                    className={cn("text-xs shrink-0", TIPO_CONFIG[pt.tipo].badge)}
                  >
                    {TIPO_CONFIG[pt.tipo].label}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Historial */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Historial de envíos
                  </CardTitle>
                  <CardDescription>Últimas 50 notificaciones enviadas</CardDescription>
                </div>
                {historial.length > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive/70 hover:text-destructive h-8 gap-1"
                    onClick={limpiarHistorial}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Limpiar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {historial.length === 0 ? (
                <div className="text-center text-muted-foreground py-8 text-sm">
                  <BellOff className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>No hay notificaciones enviadas</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {historial.map((n) => {
                    const cfg = TIPO_CONFIG[n.tipo];
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={n.id}
                        className="flex items-start gap-2.5 rounded-lg border border-border/40 bg-muted/20 px-3 py-2"
                      >
                        <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", cfg.color)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-medium truncate">{n.titulo}</p>
                            <Badge variant="outline" className={cn("text-[10px] shrink-0 py-0", cfg.badge)}>
                              {cfg.label}
                            </Badge>
                          </div>
                          {n.cuerpo && (
                            <p className="text-xs text-muted-foreground truncate">{n.cuerpo}</p>
                          )}
                          <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                            {new Date(n.timestamp).toLocaleString("es-MX", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
