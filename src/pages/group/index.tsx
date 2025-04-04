import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { Info, UserPlus, Users } from "lucide-react";
import groupDataJson from "../../Data/groupData.json";
import GroupInfoModal from "./GroupInfoModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Group {
  _id: string;
  name: string;
  description: string;
  startTime: Date | undefined;
  endTime: Date | undefined;
  freezeDuration: number | undefined;
  freezeThreshold: number | undefined;
  participantsCount: number
}

// Ensure dates are properly converted from JSON
const groupData: Group[] = (groupDataJson as any[]).map((group) => ({
  ...group,
  startTime: group.startTime ? new Date(group.startTime) : undefined,
  endTime: group.endTime ? new Date(group.endTime) : undefined,
}));

const GroupPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedGroupName, setSelectedGroupName] = useState<string | null>(null);
  
  if (!user) return <Navigate to="/auth" />;

  const handleJoinGroup = (groupId: string) => {
    console.log(`User has accepted to join group ${groupId}`);
    // Implement your join logic here
    setIsConfirmOpen(false);
  };

  const openConfirmDialog = (group: Group) => {
    setSelectedGroupId(group._id);
    setSelectedGroupName(group.name);
    setIsConfirmOpen(true);
  };

  // Function to format values, ensuring undefined values display "Not available"
  const formatValue = (value: Date | number | undefined, type: string) => {
    if (value === undefined) return `${type}: Not available`;
    if (value instanceof Date) {
      return `${type}: ${value.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    return `${type}: ${value}`;
  };

  return (
    <CustomLayout>
      <div className="min-h-screen bg-darkBg text-white p-6 space-y-8">
        <h1 className="text-2xl font-bold mb-6">GROUPS</h1>

        <div className="space-y-4">
          {groupData.length > 0 ? (
            groupData.map((group) => (
              <div key={group._id}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border border-darkStroke bg-opacity-20 bg-slate-800 rounded-xl p-4 md:p-6 shadow-lg hover:bg-slate-900 transition-all duration-200">
                  <div className="space-y-2 mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold">{group.name}</h2>
                    
                    {/* Participant count with user icon */}
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-700">
                        <Users size={12} className="text-slate-300" />
                      </div>
                      <span>{group.participantsCount} total joined</span>
                    </div>
                    
                  </div>

                  <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                    <GroupInfoModal
                      group={group}
                      trigger={
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-500 transition-colors duration-200">
                          <Info size={18} />
                          <span className="hidden sm:inline">Info</span>
                        </button>
                      }
                    />

                    <button
                      onClick={() => openConfirmDialog(group)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-200 transition-colors duration-200 text-black"
                    >
                      <UserPlus size={18} className="text-black" />
                      <span className="text-black">Join</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400">
              <p className="text-lg">No groups available</p>
              <p className="text-sm">Check back later for new groups</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog using shadcn UI */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Join Group</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to join {selectedGroupName}? You'll be added as a participant.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedGroupId && handleJoinGroup(selectedGroupId)}
              className="bg-white text-black hover:bg-gray-200"
            >
              Join Group
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CustomLayout>
  );
};

export default GroupPage;