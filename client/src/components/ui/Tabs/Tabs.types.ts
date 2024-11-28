import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ElementRef, ComponentPropsWithoutRef } from 'react';

export interface TabsProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {}

export interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}

export interface TabsContentProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}
