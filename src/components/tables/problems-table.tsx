"use client";

import { problems } from "@/lib/constants/data";
import { FaYoutube } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const ProblemsTable = () => {
  return (
    <Table className="my-5">
      <TableCaption>The list of Problems</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Solution</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map((problem) => (
          <TableRow key={problem.id}>
            <TableCell>status</TableCell>
            <TableCell>{problem.title}</TableCell>
            <TableCell>{problem.difficulty}</TableCell>
            <TableCell>{problem.category}</TableCell>
            <TableCell>
              {!problem.videoId ? (
                "Coming Soon"
              ) : (
                <a
                  target="_blank"
                  href={`https://www.youtube.com/watch?v=${problem.videoId}`}
                >
                  <FaYoutube size={30} />
                </a>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProblemsTable;
