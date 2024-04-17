'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { formSchema } from './transformSchema'
import { aspectRatioOptions } from '@/constants'
import { AspectRatioKey } from '@/types'
import TransformedImage from '../TransformedImage'
import MediaUploader from '../MediaUploader'

const TransformForm = ({ config }: { config: null | any }) => {
  const [image, setImage] = useState(null)
  const [isTransforming, setIsTransforming] = useState(false)
  const [newTransformation, setNewTransformation] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startTransform, setStartTransform] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      selectedPlan: '',
      publicId: '',
    },
  })

  const onSubmit = (values: { username: string; selectedPlan: string }) => {
    console.log(values)
  }

  const onTransformHandler = () => {
    setStartTransform(true)
  }

  const onSelectFieldHandler = (value: string, onChange: any) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey]
    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }))
    return onChange(value)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="selectedPlan"
          render={({ field }) => (
            <Select
              onValueChange={(value) =>
                onSelectFieldHandler(value, field.onChange)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(aspectRatioOptions).map((key) => (
                  <SelectItem key={key} value={key} className="select-item">
                    {aspectRatioOptions[key as AspectRatioKey].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <div className="media-uploader-field">
          <FormField
            control={form.control}
            name="publicId"
            render={({ field }) => (
              <FormItem className="flex size-full flex-col">
                <FormControl>
                  <MediaUploader
                    onValueChange={field.onChange}
                    setImage={setImage}
                    publicId={field.value}
                    image={image}
                    type="fill"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <TransformedImage
            image={image}
            type="fill"
            title={'test'}
            startTransform={startTransform}
            setStartTransform={setStartTransform}
            transformationConfig={config}
          />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <Button
            type="button"
            className="submit-button capitalize"
            disabled={
              !image ||
              form.getValues().selectedPlan === '' ||
              form.getValues().username === ''
            }
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transforming...' : 'Apply Transformation'}
          </Button>
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformForm
