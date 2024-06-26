'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { sendEmail } from '@/actions/sendEmail';
import { useToast } from './ui/use-toast';

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  socialMedia: z.string().url({ message: 'Please provide a valid URL' }),
  bio: z.string().min(10).max(150),
});

export default function ApplyForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      socialMedia: '',
      bio: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await sendEmail(values);

    if (response.success) {
      toast({
        title: 'Email sent successfully!',
        description: 'You will hear back from us within 24 hours.',
        className: 'bg-green-500 text-white',
      });
    } else {
      toast({
        title: 'An error occurred while sending the email',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 shadow-md rounded p-8"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  {...field}
                  className="focus:bg-gray-100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Doe"
                  {...field}
                  className="focus:bg-gray-100"
                />
              </FormControl>
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
                  placeholder="example@aol.com"
                  {...field}
                  className="focus:bg-gray-100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socialMedia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Media</FormLabel>
              <FormDescription>
                Please provide a social media link (LinkedIn, X, etc.)
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="https://www.linkedin.com/in/obialo/"
                  {...field}
                  className="focus:bg-gray-100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormDescription>Please provide a short bio.</FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little about yourself..."
                  {...field}
                  className="focus:bg-gray-100 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`w-full ${
            form.formState.isSubmitting && 'cursor-not-allowed bg-gray-300'
          }`}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Apply'}
        </Button>
      </form>
    </Form>
  );
}
