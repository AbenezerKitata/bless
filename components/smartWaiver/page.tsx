import React from "react";
import { getWaivers } from "@/data/page";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SmartWaiverDrawer } from "@/components/smartWaiver/Drawer/page";
const SmartWaiverTablePage = async () => {
  const { data: waiversData } = await getWaivers("waivers", 10);
  const waivers = waiversData.waivers as Waiver[];

  return (
    <div>
      {waivers.length > 0 ? (
        <Table>
          <TableCaption>Sunbuggy Waivers From SmartWaiver</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead>Waiver ID</TableHead> */}
              <TableHead>Title</TableHead>
              <TableHead>Created On</TableHead>
              {/* <TableHead>Expiration Date</TableHead> */}
              {/* <TableHead>UnExpired</TableHead> */}
              <TableHead>Verified</TableHead>
              {/* <TableHead>Kiosk</TableHead> */}
              <TableHead>First Name</TableHead>
              <TableHead>Middle Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Is Minor</TableHead>
              <TableHead>Auto Tag</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {waivers.map((waiver) => (
              <TableRow key={waiver.waiverId}>
                {/* <TableCell>{waiver.waiverId}</TableCell> */}
                <TableCell>{waiver.title}</TableCell>
                <TableCell>{waiver.createdOn}</TableCell>
                {/* <TableCell>{waiver.expirationDate}</TableCell> */}
                {/* <TableCell>{waiver.expired ? "❌" : "✅"}</TableCell> */}
                <TableCell>{waiver.verified ? "✅" : "❌"}</TableCell>
                {/* <TableCell>{waiver.kiosk}</TableCell> */}
                <TableCell>{waiver.firstName}</TableCell>
                <TableCell>{waiver.middleName}</TableCell>
                <TableCell>{waiver.lastName}</TableCell>
                <TableCell>{waiver.dob}</TableCell>
                <TableCell>{waiver.isMinor ? "✔️" : "❎"}</TableCell>
                <TableCell>{waiver.autoTag}</TableCell>
                <TableCell>
                  <SmartWaiverDrawer id={waiver.waiverId} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No waivers found</p>
      )}
    </div>
  );
};

export default SmartWaiverTablePage;
