'use client';

import { Textarea } from '@/components/ui/textarea';
import { sendPost } from '@/actions/sendPost';
import { useToast } from './ui/use-toast';
import SubmitPost from './SubmitPost';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

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
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      post: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await sendPost(values);

    if (response.success) {
      toast({
        title: 'Post created successfully!',
        description: 'Your post has been shared with AthleteTurned.',
        className: 'bg-green-500 text-white',
      });
      form.reset();
    } else {
      toast({
        title: 'An error occurred while creating the post',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
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
            className={`${
              form.formState.isSubmitting && 'cursor-not-allowed bg-gray-300'
            }`}
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting ? 'Sending...' : 'Share'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
