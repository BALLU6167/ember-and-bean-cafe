import React from 'react';
import { X, Bell, Plane, Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export interface AlertNotification {
  id: string;
  type: 'gate_change' | 'delay' | 'checkin';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'normal';
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: AlertNotification[];
  onMarkAllRead: () => void;
  onSelectAlertAction?: (alertId: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onMarkAllRead,
  onSelectAlertAction
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-obsidian-950 border-l border-cyan-500/40 h-full flex flex-col shadow-cyan-lg">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-obsidian-900">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs font-bold tracking-wider text-white uppercase">
              HIGH-UTILITY FLIGHT & TRANSIT ALERTS
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-4 py-2 bg-obsidian-900/50 border-b border-white/5 flex items-center justify-between text-xs font-mono">
          <span className="text-white/40">Filtered to zero-noise transit updates only</span>
          <button 
            onClick={onMarkAllRead}
            className="text-cyan-400 hover:text-cyan-300 font-bold underline"
          >
            Mark all read
          </button>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3.5 rounded-xl border transition-all ${
                alert.priority === 'high'
                  ? 'bg-obsidian-900 border-cyan-500/60 shadow-cyan-sm'
                  : 'bg-obsidian-900/60 border-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-cyan-500/20 text-cyan-300">
                    {alert.type === 'delay' ? <Clock className="w-3.5 h-3.5" /> : <Plane className="w-3.5 h-3.5" />}
                  </div>
                  <span className="font-mono text-xs font-bold text-white">{alert.title}</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">{alert.timestamp}</span>
              </div>

              <p className="mt-2 text-xs text-white/70 leading-relaxed font-sans">
                {alert.message}
              </p>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <span className="text-white/40 uppercase">Priority: {alert.priority}</span>
                <button
                  onClick={() => {
                    if (onSelectAlertAction) onSelectAlertAction(alert.id);
                    onClose();
                  }}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
                >
                  <span>View in Timeline</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Guarantee */}
        <div className="p-4 border-t border-white/10 bg-obsidian-900 text-center text-xs font-mono text-white/50">
          Zero marketing promotions. Zero generic recommendations.
        </div>

      </div>
    </div>
  );
};
