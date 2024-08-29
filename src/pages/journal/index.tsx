import React, { useEffect, useState } from "react";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { Drawer, Button, List, message } from "antd";
import useFetchData from "../../hooks/useFetch";
import { IJournalEntry, IQuestion } from "../../types/data";
import RatingTrendChart from "./ratingsChart";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

import usePostData from "../../hooks/usePost";
import useAxios from "../../hooks/useAxios";

const Index = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
    return null;
  }
  const api = useAxios();

  const [isAddJournalDrawerOpen, setIsAddJournalDrawerOpen] = useState(false);
  const [journalType, setJournalType] = useState<"entry" | "exit">("entry");
  const [questions, setQuestions] = useState<IQuestion[] | null>(null);
  const [responses, setResponses] = useState<
    { question: string; answer: string }[]
  >([]);
  const [file, setFile] = useState<File | null>(null);
  const [emotionVal, setEmotionVal] = useState("");

  const [selectedJournal, setSelectedJournal] = useState<string | null>(null);
  const [isViewJournalDrawerOpen, setIsViewJournalDrawerOpen] = useState(false);

  const { data: questionsResponse } = useFetchData<{
    status: string;
    data: IQuestion[];
  } | null>("/question");

  const { data: journalEntryResponse } = useFetchData<{
    status: string;
    data: { _id: string; date: string }[];
  } | null>("/journal/monthlyEntry/user?month=8&year=2024");

  const { postData: addJournalPost, data: addJournalResponse } = usePostData<
    any,
    { data: any }
  >("/journal/add");

  useEffect(() => {
    if (questionsResponse && questionsResponse.status === "success") {
      setQuestions(questionsResponse.data);
    }
  }, [questionsResponse]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

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
    try {
      await addJournalPost({
        type: journalType,
        responses: responses,
      });
      console.log(addJournalResponse);
      if (
        addJournalResponse &&
        addJournalResponse.data &&
        addJournalResponse.data.journal
      ) {
        const journalIdResponseId = addJournalResponse.data.journal._id;
        if (file && journalIdResponseId != "") {
          const formData = new FormData();
          formData.append("files", file);
          try {
            const uploadResponse = await api.post(
              "/upload/" + journalEntryResponse,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (uploadResponse.status === 200) {
              message.success("Uploaded file");
            }
          } catch (error) {
            message.error("Failed to upload file");
          }
        }

        if (emotionVal && journalIdResponseId != "") {
          try {
            const postEmotionResponse = await api.post(
              "/emotion/" + journalEntryResponse,
              { value: emotionVal }
            );
            if (postEmotionResponse.status === 200) {
              message.success("Emotions saved!");
            }
          } catch (error) {
            message.error("Emotion saving failed");
          }
        }

        setResponses([]);
        setFile(null);
        setEmotionVal("");
        setIsAddJournalDrawerOpen(false);
      }
    } catch (error) {
      console.error("Error submitting journal:", error);
    }
  };
  const { data: journalEntry } = useFetchData<{
    status: string;
    data: IJournalEntry;
  }>(`/journal/${selectedJournal}`);
  console.log(journalEntry);
  const handleViewJournal = (journal: string) => {
    setSelectedJournal(journal);
    setIsViewJournalDrawerOpen(true);
  };

  return (
    <CustomLayout>
      <section className="p-4">
        <div className="text-black mb-4">
          <h1 className="text-2xl">Hello {user.firstName}</h1>
          <h1 className="text-2xl">
            Good {new Date().getHours() < 12 ? "morning" : "afternoon"}
          </h1>
        </div>
        <div className="flex justify-center items-center space-x-3 mb-4">
          <div className="w-1/2 bg-slate-900 rounded-md h-32 flex items-center flex-col justify-center">
            <h1 className="text-white text-xl">Pre Trade</h1>
            <button
              onClick={() => {
                setIsAddJournalDrawerOpen(true);
                setJournalType("entry");
              }}
              className="bg-white text-black px-5 py-2 rounded-sm mt-2"
            >
              Enter
            </button>
          </div>
          <div className="w-1/2 bg-slate-900 rounded-md h-32 flex items-center flex-col justify-center">
            <h1 className="text-white text-xl">Post Trade</h1>
            <button
              onClick={() => {
                setIsAddJournalDrawerOpen(true);
                setJournalType("exit");
              }}
              className="bg-white text-black px-5 py-2 rounded-sm mt-2"
            >
              Enter
            </button>
          </div>
        </div>

        <RatingTrendChart
          data={[
            { _id: "2024-07-16", averageRating: 2 },
            { _id: "2024-07-17", averageRating: 4.3 },
            { _id: "2024-07-19", averageRating: 4.1 },
          ]}
        />

        {/* List of Journal Entries */}
        <List
          className="journal-entries-list mb-4"
          dataSource={journalEntryResponse?.data || []}
          renderItem={(entry) => (
            <List.Item className="journal-entry-item flex justify-between">
              <span>
                {new Date(entry.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                })}
              </span>
              <Button type="link" onClick={() => handleViewJournal(entry._id)}>
                Click here to view the journal
              </Button>
            </List.Item>
          )}
        />

        {/* Drawer for Adding Journal */}
        <Drawer
          height="90%"
          open={isAddJournalDrawerOpen}
          placement="bottom"
          onClose={() => setIsAddJournalDrawerOpen(false)}
        >
          <h1 className="text-center font-semibold text-xl mb-4">
            {journalType === "entry" ? "Pre" : "Post"} Trade Journal
          </h1>
          {questions &&
            questions.map(
              (q) =>
                ((q.isPre && journalType === "entry") ||
                  (!q.isPre && journalType === "exit")) && (
                  <div key={q._id} className="mb-4">
                    <h1 className="font-medium text-gray-700 mb-1">
                      {q.title}
                    </h1>
                    <input
                      className="bg-slate-100 rounded-md border-[0.7px] w-full border-slate-400 p-2"
                      placeholder={q.title}
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
            <h1 className="font-medium text-gray-700 mb-1">Upload file</h1>
            <label className="block bg-slate-100 border-dashed border-2 border-gray-300 rounded-md p-6 text-center cursor-pointer">
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="flex flex-col items-center">
                <span className="text-blue-500 text-xl">+</span>
                <p className="text-gray-500">Click to upload</p>
                <small className="text-gray-400">JPEG PNG JPG &lt; 5 MB</small>
              </div>
            </label>
          </div>

          <div className="mb-4">
            <h1 className="font-medium text-gray-700 mb-1">Emotions</h1>
            <div className="flex justify-between items-center bg-slate-100 border-2 border-gray-300 py-4 px-2 rounded-md">
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
                    "border-[2px] bg-yellow-200 border-yellow-500"
                  } cursor-pointer h-full w-32 rounded-md`}
                >
                  <span className="text-3xl">{emotion.emoji}</span>
                  <span className="text-sm">{emotion.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmitJournal}
            className="bg-slate-800 text-white w-full py-2 rounded-md hover:bg-slate-700 transition"
          >
            Submit Journal
          </button>
        </Drawer>
        <Drawer
          height={"90%"}
          placement="bottom"
          onClose={() => {
            setIsViewJournalDrawerOpen(false);
          }}
          open={isViewJournalDrawerOpen}
        >
          {journalEntry?.data.responses.map((res) => (
            <div>
              <h1>{res.question.title}</h1>
              <input
              disabled
                      className="bg-slate-100 rounded-md border-[0.7px] w-full border-slate-400 p-2"
                      value={res.answer}
                      readOnly
                      
                    />
            </div>
          ))}
        </Drawer>
      </section>
    </CustomLayout>
  );
};

export default Index;
