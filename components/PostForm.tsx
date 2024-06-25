'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  post: z
    .string()
    .min(10, {
      message: 'Your post must be at least 10 characters.',
    })
    .max(240, {
      message: 'Your post can not be more than 240 characters.',
    }),
});

export default function PostForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      post: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="What would you like to share?"
                  className="resize-none lg:text-lg placeholder:text-gray-400/70"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            className="hover:bg-green-400"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Send post
          </Button>
        </div>
      </form>
    </Form>
  );
}
