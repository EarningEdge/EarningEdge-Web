import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Link, Navigate } from "react-router-dom";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { Info, Loader2, UserPlus, Users } from "lucide-react";
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
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";
interface Group {
  _id: string;
  name: string;
  description: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  freezeDuration: number | undefined;
  freezeThreshold: number | undefined;
  participantsCount: number;
}

const GroupPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const api = useAxios();
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [joiningGroup, setJoiningGroup] = useState(false);
  const [selectedGroupName, setSelectedGroupName] = useState<string | null>(
    null
  );

  const [groupParticipationStatus, setGroupParticipationStatus] = useState<
    Record<string, string>
  >({});
  if (!user) return <Navigate to="/auth" />;

  const handleJoinGroup = async (groupId: string) => {
    setJoiningGroup(true);
    try {
      await api.post(`/group/${groupId}/participants`, {
        userId: user._id,
      });
      setIsConfirmOpen(false);
      setGroupParticipationStatus((prev) => ({
        ...prev,
        [groupId]: "pending",
      }));
      toast.success("Request sent successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Failed to join group");
      }
      console.log(error);
    } finally {
      setJoiningGroup(false);
    }
  };

  const openConfirmDialog = (group: Group) => {
    setSelectedGroupId(group._id);
    setSelectedGroupName(group.name);
    setIsConfirmOpen(true);
  };
  useEffect(() => {
    const userParticipatingGroups = async () => {
      setGroupsLoading(true);
      try {
        const response = await api.get(
          `/group/getParticipants/participants/${user._id}`
        );
        const data = response.data.map((item: any) => ({
          groupId: item.groupId._id,
          status: item.status,
        }));
        setGroupParticipationStatus(
          data.reduce((acc: Record<string, string>, curr: any) => {
            acc[curr.groupId] = curr.status;
            return acc;
          }, {})
        );
      } catch (error) {
        console.log(error);
      } finally {
        setGroupsLoading(false);
      }
    };
    const fetchGroups = async () => {
      try {
        const response = await api.get("/group/");
        console.log(response.data);
        setGroups(response.data);
        setGroupsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setGroupsLoading(false);
      }
    };
    userParticipatingGroups();
    fetchGroups();
  }, []);
  return (
    <CustomLayout>
      <div className="min-h-screen bg-darkBg text-white p-6 space-y-8">
        <h1 className="text-2xl font-bold mb-6">GROUPS</h1>
        {groupsLoading && (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="animate-spin" size={24} />
          </div>
        )}
        <div className="space-y-4">
          {groups.length > 0 ? (
            groups.map((group) => (
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
                      disabled={
                        groupParticipationStatus[group._id] === "pending" ||
                        groupParticipationStatus[group._id] === "approved" ||
                        groupParticipationStatus[group._id] === "rejected"
                      }
                      onClick={() => openConfirmDialog(group)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-200 transition-colors duration-200 text-black disabled:opacity-50 disabled:cursor-not-allowed",
                        groupParticipationStatus[group._id] === "pending" &&
                          "bg-blue-500 hover:bg-blue-600",
                        groupParticipationStatus[group._id] === "approved" &&
                          "bg-green-500 hover:bg-green-600 text-white disabled:opacity-100",
                        groupParticipationStatus[group._id] === "rejected" &&
                          "bg-red-500 hover:bg-red-600"
                      )}
                    >
                      {groupParticipationStatus[group._id] !== "pending" &&
                        groupParticipationStatus[group._id] !== "approved" &&
                        groupParticipationStatus[group._id] !== "rejected" && (
                          <UserPlus size={18} className="text-black" />
                        )}
                      {joiningGroup ? (
                        <span className="text-black">Joining...</span>
                      ) : (
                        <span
                          className={cn(
                            "text-black",
                            groupParticipationStatus[group._id] === "pending" &&
                              "text-blue-100",
                            groupParticipationStatus[group._id] ===
                              "approved" && "text-green-100",
                            groupParticipationStatus[group._id] ===
                              "rejected" && "text-red-100"
                          )}
                        >
                          {groupParticipationStatus[group._id] === "pending"
                            ? "Request Sent"
                            : groupParticipationStatus[group._id] === "approved"
                            ? "Approved"
                            : groupParticipationStatus[group._id] === "rejected"
                            ? "Rejected"
                            : "Join"}
                        </span>
                      )}
                    </button>
                    {groupParticipationStatus[group._id] === "approved" && (
                      <Link
                        to={`/group/${group._id}/leaderboard`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-200 transition-colors duration-200 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Leaderboard
                      </Link>
                    )}
                    {/* {groupParticipationStatus[group._id] === "rejected" && (
                      <span className="text-black">Join again</span>
                    )} */}
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
              Are you sure you want to join {selectedGroupName}? You'll be added
              as a participant.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                selectedGroupId && handleJoinGroup(selectedGroupId)
              }
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
