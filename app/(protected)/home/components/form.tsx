"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import React from "react";

const FormSchema = z.object({
  seldate: z.date({
    required_error: "A date of birth is required.",
  }),
  selNum: z.number({
    required_error: "A valid number is required.",
  }),
});

export default function DatePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const popoverRef = React.useRef();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 ml-5 flex flex-col  items-baseline"
      >
        <FormField
          control={form.control}
          name="selNum"
          render={({ field }) => (
            <FormItem className="flex items-baseline gap-4">
              <FormLabel className=" text-lg">Select a number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="w-[8ch]"
                />
              </FormControl>
              {/* <FormDescription>
                Get the prices for the selected date.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="seldate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                {/* <FormLabel>Select a date</FormLabel> */}
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
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
                      onSelect={field.onChange}
                      disabled={{ before: new Date() }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Get the prices for the selected date.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Let&apos;s Go!</Button>
        </div>
      </form>
    </Form>
  );
}
