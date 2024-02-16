"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  plannerName: z.string().min(2, {
    message: "Planner name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  numberOfPeople: z.number().min(1, {
    message: "Number of people must be at least 1.",
  }),
  eventName: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  eventDate: z.date({
    required_error: "Please enter a valid date.",
  }),
  pickupTime: z.string().min(2, {
    message: "Pickup time must be at least 2 characters.",
  }),
  dropoffTime: z.string().min(2, {
    message: "Dropoff time must be at least 2 characters.",
  }),
});

export default function CreateProposal() {
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  const [open, setOpen] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="plannerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Planner Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="some placeholder"
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This is the name of the planner.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="some placeholder"
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This is the email of the person planning the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="some placeholder"
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Phone Number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="some placeholder"
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>event name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfPeople"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of People</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="some placeholder"
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This is the number of people attending the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Event Date</FormLabel>
              <Popover open={open}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      onClick={() => setOpen(!open)}
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setOpen(!open);
                    }}
                    disabled={{
                      before: new Date(),
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Event Date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pickupTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of People</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  placeholder="some placeholder"
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Pickup time.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dropoffTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dropoff Time</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  placeholder="some placeholder"
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Dropoff time.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
