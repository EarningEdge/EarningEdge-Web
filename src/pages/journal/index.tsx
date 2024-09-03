import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { Drawer, List, message } from "antd";
import {  IQuestion } from "../../types/data";
// import RatingTrendChart from "./ratingsChart";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import dayjs from "dayjs";
import { getGreeting } from "../../utils/greetings";
import MonthList from "./month-picker";
import utc from "dayjs/plugin/utc";
import {  CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import FileUpload from './FileUpload';  // Adjust the import path as needed
import BlurBlobs from "./Blurblobs";
const Index = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  dayjs.extend(utc);
  const [isAddJournalDrawerOpen, setIsAddJournalDrawerOpen] = useState(false);
  const [journalType, setJournalType] = useState<"entry" | "exit">("entry");
  const [responses, setResponses] = useState<
    { question: string; answer: string }[]
  >([]);
  const [files, setFiles] = useState<File[]>([]);
    const [emotionVal, setEmotionVal] = useState("");
  const [selectedJournal, setSelectedJournal] = useState<string | null>(null);
  const [isViewJournalDrawerOpen, setIsViewJournalDrawerOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const api = useAxios();

  // Fetch questions
  const { data: questions } = useQuery<IQuestion[]>({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await api.get("/question");
      return response.data.data;
    },
  });

  // Fetch journal entries
  const { data: journalEntries, refetch: refetchJournalEntries } = useQuery<
    any[]
  >({
    queryKey: ["journalEntries", selectedMonth.format("YYYY-MM")],
    queryFn: async () => {
      const month = selectedMonth.month() + 1;
      const year = selectedMonth.year();
      const response = await api.get(
        `/journal/monthlyEntry/user?month=${month}&year=${year}`
      );
      return response.data.data;
    },
  });

  // Fetch single journal entry
  const { data: journalEntry, isLoading: isJournalEntryLoading } =
    useQuery<any>({
      queryKey: ["journalEntry", selectedJournal],
      queryFn: async () => {
        if (!selectedJournal) throw new Error("No journal selected");
        const response = await api.get(`/journal/${selectedJournal}`);
        return response.data.data;
      },
      enabled: !!selectedJournal,
    });

  // Add journal mutation
  const addJournalMutation = useMutation({
    mutationFn: async (journalData: any) => {
      const response = await api.post("/journal/add", journalData);
      return response.data;
    },
    onSuccess: () => {
      message.success("Journal added successfully");
      setIsAddJournalDrawerOpen(false);
      setResponses([]);
      setFiles([]);
      setEmotionVal("");
    },
    onError: () => {
      message.error("Failed to add journal");
    },
  });
  

  // Upload file mutation
  const uploadFileMutation = useMutation({
    mutationFn: async ({
      journalId,
      file,
    }: {
      journalId: string;
      file: File;
    }) => {
      const formData = new FormData();
      formData.append("files", file);
      const response = await api.post(`/upload/${journalId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (_, variables) => message.success(`File ${variables.file.name} uploaded successfully`),
    onError: (_, variables) => message.error(`Failed to upload file ${variables.file.name}`),
  });

  // Post emotion mutation
  const postEmotionMutation = useMutation({
    mutationFn: async ({
      journalId,
      value,
    }: {
      journalId: string;
      value: string;
    }) => {
      const response = await api.post(`/emotion/${journalId}`, { value });
      return response.data;
    },
    onSuccess: () => message.success("Emotion saved successfully"),
    onError: () => message.error("Failed to save emotion"),
  });

  const handleInputChange = (questionId: string, value: string) => {
    setResponses((prev) => {
      const existingIndex = prev.findIndex((r) => r.question === questionId);
      if (existingIndex !== -1) {
        const newResponses = [...prev];
        newResponses[existingIndex] = {
          ...newResponses[existingIndex],
          answer: value,
        };
        return newResponses;
      } else {
        return [...prev, { question: questionId, answer: value }];
      }
    });
  };

  const handleSubmitJournal = async () => {
    const journalData = { type: journalType, responses };
    const result = await addJournalMutation.mutateAsync(journalData);
  
    if (result.status === "success") {
      const journalId = result.data?.journal?._id;
      if (journalId && files.length > 0) {
        for (const file of files) {
          await uploadFileMutation.mutateAsync({ journalId, file });
        }
      }
      if (emotionVal && journalId) {
        await postEmotionMutation.mutateAsync({ journalId, value: emotionVal });
      }
    }
    refetchJournalEntries();
  };

  const handleViewJournal = (journal: string) => {
    setSelectedJournal(journal);
    setIsViewJournalDrawerOpen(true);
  };

  const isJournalSubmittedForToday = useCallback(
    (type: "entry" | "exit") => {
      const todayUtc = dayjs().utc().format("YYYY-MM-DD");
      return journalEntries?.some(
        (entry) =>
          dayjs(entry.date).format("YYYY-MM-DD") === todayUtc &&
          entry.type === type
      );
    },
    [journalEntries]
  );

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <CustomLayout>
      <BlurBlobs />
      <section className="p-4 relative z-10">
        <div className="text-black mb-4">
          <h1 className="text-2xl text-slate-200">Hello {user.firstName}, {getGreeting()}! </h1>
          {/* <h1 className="text-2xl text-slate-200"></h1> */}
        </div>
        <div className="flex justify-center items-center space-x-3 mb-4">
          <div className="w-1/2  bg-darkSecondary rounded-md h-32 flex items-center flex-col justify-center border-[0.4px] border-darkStroke">
            <h1 className={`text-xl ${
                isJournalSubmittedForToday("entry")
                  ? "text-slate-500"
                  : "text-white "
              }`}>Pre Trade</h1>
            <button
              onClick={() => {
                setIsAddJournalDrawerOpen(true);
                setJournalType("entry");
              }}
              disabled={isJournalSubmittedForToday("entry")}
              className={`bg-white text-black px-5 py-2 rounded-sm mt-2 ${
                isJournalSubmittedForToday("entry")
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Enter
            </button>
          </div>
          <div className="w-1/2 bg-darkSecondary rounded-md h-32 flex items-center flex-col justify-center border-[0.4px] border-darkStroke">
          <h1 className={`text-xl ${
                isJournalSubmittedForToday("entry")
                  ? "text-slate-500"
                  : "text-white "
              }`}>Post Trade</h1>
            <button
              onClick={() => {
                setIsAddJournalDrawerOpen(true);
                setJournalType("exit");
              }}
              disabled={isJournalSubmittedForToday("exit")}
              className={`bg-white text-black px-5 py-2 rounded-sm mt-2 ${
                isJournalSubmittedForToday("exit")
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Enter
            </button>
          </div>
        </div>

        {/* <RatingTrendChart
          data={[
            { _id: "2024-07-16", averageRating: 2 },
            { _id: "2024-07-17", averageRating: 4.3 },
            { _id: "2024-07-19", averageRating: 4.1 },
          ]}
        /> */}

        <MonthList
          onSelectMonth={(val: any) => {
            console.log(val);
            setSelectedMonth(val);
          }}
        />

        <List
          className="journal-entries-list h-full"
          dataSource={journalEntries || []}
          renderItem={(entry:{date:string,_id:string,hasReview:boolean,type:string}) => (
            <List.Item className="">
              <div className="journal-entry-item p-3 w-full flex justify-between items-center  border-darkStroke border-[0.6px] rounded-md  bg-darkSecondary">
                <div>
                <span className="text-slate-200 ">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="ml-2">
                    {entry.hasReview?<span className="text-green-600">Reviewed <CheckCircleOutlined className="text-green-400"/> </span>:<span className="text-slate-500">Review Pending <ClockCircleOutlined className="text-slate-400"/> </span>}
                </span>
                  </div>
                <div className="flex justify-center items-center space-x-2 mr-1 md:mr-3">
                  <span
                    className={`border-[0.4px] flex justify-center items-center w-12 md:w-16 text-center text-sm  rounded-md px-3 py-2 ${
                      entry.type !== "entry"
                        ? " border-blue-500 text-blue-500"
                        : " border-green-500 text-green-600"
                    }`}
                  >
                    {entry.type}
                  </span>
                  <button
                    className="bg-white text-black rounded-md px-4 py-2"
                    onClick={() => handleViewJournal(entry._id)}
                  >
                    View
                  </button>
                </div>
              </div>
            </List.Item>
          )}
        />

        <Drawer
          height="90%"
          open={isAddJournalDrawerOpen}
          placement="bottom"
          onClose={() => setIsAddJournalDrawerOpen(false)}
          style={{ backgroundColor: "#13111c" }}
        >
          <h1 className="text-center text-slate-400 journalTypeHeading font-semibold text-xl mb-4">
            {journalType === "entry" ? "Pre" : "Post"} Trade Journal
          </h1>
          {questions &&
            questions.map(
              (q) =>
                ((q.isPre && journalType === "entry") ||
                  (!q.isPre && journalType === "exit")) && (
                  <div key={q._id} className="mb-4">
                    <h1 className="font-medium text-gray-200 mb-1">
                      {q.title}
                    </h1>
                    <input
                      className=" bg-darkSecondary border-[0.4px] border-darkStroke rounded-md w-full text-white p-2"
                      placeholder={"Please the type here"}
                      value={
                        responses.find((r) => r.question === q._id)?.answer ||
                        ""
                      }
                      onChange={(e) => handleInputChange(q._id, e.target.value)}
                    />
                  </div>
                )
            )}
          <div className="mb-4">
            <FileUpload onFileChange={setFiles} />
          </div>

          <div className="mb-4">
            <h1 className="font-medium text-gray-200 mb-1">Emotions</h1>
            <div className="flex justify-between items-center bg-darkSecondary border-2 border-darkStroke py-4 px-2 rounded-md">
              {[
                { emoji: "🤑", label: "Greedy" },
                { emoji: "😟", label: "Nervous" },
                { emoji: "😱", label: "Fearful" },
              ].map((emotion) => (
                <div
                  onClick={() => setEmotionVal(emotion.label.toLowerCase())}
                  key={emotion.label}
                  className={`flex flex-col items-center ${
                    emotion.label.toLowerCase() === emotionVal &&
                    "border-[2px] bg-slate-900 border-slate-500"
                  } cursor-pointer h-full w-32 rounded-md`}
                >
                  <span className="text-3xl">{emotion.emoji}</span>
                  <span className="text-sm text-white">{emotion.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmitJournal}
            className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-slate-700 transition"
          >
            Submit Journal
          </button>
        </Drawer>
        <Drawer
          style={{ backgroundColor: "#13111c" }}
          height={"90%"}
          placement="bottom"
          onClose={() => {
            setIsViewJournalDrawerOpen(false);
            setSelectedJournal(null);
          }}
          open={isViewJournalDrawerOpen}
        >{
          isJournalEntryLoading && <h1 className="text-white">Loading...</h1>
        }
          {journalEntry?.responses.map((res: any) => (
            <div key={res.question._id}>
              <div>
                <h1 className="text-white">{res.question.title}</h1>
                <input
                  disabled
                  className=" bg-darkSecondary border-[0.4px] my-2 border-darkStroke rounded-md w-full text-white  p-2"
                  value={res.answer}
                  readOnly
                />
              </div>
            </div>
          ))}
          <div className=" pt-2 border-t-[0.4px] border-darkStroke">
            <h1 className="text-slate-400 py-1 text-xl">
              Emotion:{" "}
              <span className="text-white uppercase">
                {" "}
                {journalEntry?.emotion?.value || "Not Recorded"}
              </span>
            </h1>
          </div>
          <div className=" pt-2 border-t-[0.4px] border-darkStroke">
            <h1 className="text-slate-400 py-1 text-xl">Uploads</h1>
            <div className="grid grid-cols-1 md:grid-cols-4">
              {journalEntry?.uploads?.map((e: any) => {
                return <img className="rounded-md" src={e.fileUrl}></img>;
              })}
            </div>
          </div>
        </Drawer>
      </section>
    </CustomLayout>
  );
};

export default Index;
