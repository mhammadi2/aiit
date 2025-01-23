// components/admin/email-lists/email-list-form.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import * as z from "zod"

const emailListSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  emails: z.string().transform((str) => 
    str.split(/[
,]/).map((email) => email.trim()).filter(Boolean)
  ).refine((emails) => 
    emails.every((email) => 
      z.string().email().safeParse(email).success
    ),
    "Invalid email address format"
  ),
})

export function EmailListForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(emailListSchema),
    defaultValues: {
      name: "",
      description: "",
      emails: "",
    },
  })

  async function onSubmit(data: z.infer<typeof emailListSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/email-lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to create email list")

      toast({
        title: "Success",
        description: "Email list created successfully",
      })

      router.push("/admin/email-lists")
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create email list",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>List Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Addresses</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter email addresses (one per line or comma-separated)"
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Email List"}
        </Button>
      </form>
    </Form>
  )
}
