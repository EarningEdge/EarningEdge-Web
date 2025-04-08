import React from "react";
import { Calendar, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GroupDescription from "./GroupDescription";

interface Group {
  _id: string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  freezeDuration?: number;
  freezeThreshold?: number;
}

interface GroupInfoModalProps {
  group: Group;
  trigger: React.ReactNode;
}

const GroupInfoModal: React.FC<GroupInfoModalProps> = ({ group, trigger }) => {
  const formatDate = (date?: Date) => {
    if (!date) return "Not available";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "Not available";
    }
    return parsedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date?: Date) => {
    if (!date) return "Not set";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "Not set";
    }
    return parsedDate.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      const remainingMinutes = minutes % 60;
      return `${hours} ${hours === 1 ? "hour" : "hours"}${
        remainingMinutes > 0
          ? ` ${remainingMinutes} ${
              remainingMinutes === 1 ? "minute" : "minutes"
            }`
          : ""
      }`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    } else {
      return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {group.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex flex-col sm:flex-row sm:gap-6 mb-6">
            <div className="flex flex-col gap-1 mb-2 sm:mb-0">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-gray-500">Start Date:</span>
                <span>{formatDate(group.startDate)}</span>
              </div>
              <div className="flex items-center gap-2 ">
                <Clock size={16} className="text-gray-400" />
                <span className="text-gray-500">Time:</span>
                <span>{formatTime(group.startDate)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-gray-500">End Date:</span>
                <span>{formatDate(group.endDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span className="text-gray-500">Time:</span>
                <span>{formatTime(group.endDate)}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <GroupDescription description={group.description} />
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-full">
                <p className="text-sm text-gray-500">Freeze Duration</p>
                <p className="font-medium">
                  {typeof group.freezeDuration === "number"
                    ? formatDuration(group.freezeDuration)
                    : "Not available"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <p className="text-sm text-gray-500">Freeze Threshold</p>
                <p className="font-medium">
                  {typeof group.freezeThreshold === "number"
                    ? `${group.freezeThreshold}%`
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupInfoModal;
