import React from "react";

import Link from "next/link";
import {
  AlertTriangleIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disable?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = ({
  title,
  description,
  onNew,
  newButtonHref,
  newButtonLabel,
  disable,
  isCreating,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-xs md:text-sm">
            {description}
          </p>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button disabled={isCreating || disable} size="sm" onClick={onNew}>
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button size="sm" asChild>
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="h-full p-4 md:px-10 md:py-6">
      <div className="mx-auto flex size-full max-w-screen-xl flex-col gap-y-8">
        {header}
        <div className="flex h-full flex-col gap-y-4">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};

interface EntitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const EntitySearch = ({
  value,
  onChange,
  placeholder,
}: EntitySearchProps) => {
  return (
    <InputGroup className="bg-background border-border relative ml-auto max-w-[200px] shadow-none">
      <InputGroupInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      {value && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            variant="icon"
            onClick={() => onChange("")}
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <div className="text-muted-foreground flex-1 text-sm">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          size="sm"
          variant="outline"
          disabled={page === 1 || disabled}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={page === totalPages || totalPages === 0 || disabled}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

interface StateViewProps {
  message?: string;
}

export const LoadingView = ({ message }: StateViewProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-4">
      <Loader2Icon className="text-primary size-6 animate-spin" />
      {!!message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );
};

export const ErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-4">
      <AlertTriangleIcon className="text-primary size-6" />
      {!!message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );
};

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
}

export const EmptyView = ({ message, onNew }: EmptyViewProps) => {
  return (
    <Empty className="border border-dashed bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No items</EmptyTitle>
        {!!message && <EmptyDescription>{message}</EmptyDescription>}
      </EmptyHeader>
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>Add item</Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}

export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex flex-1 justify-center">
        <div className="mx-auto max-w-sm">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

interface EntityItemProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}

export const EntityItem = ({
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: EntityItemProps) => {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRemoving) return;

    if (onRemove) await onRemove();
  };

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "cursor-pointer p-4 shadow-none hover:shadow",
          isRemoving && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-0">
          <div className="flex items-center gap-3">
            {image}
            <div className="">
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              {!!subtitle && (
                <CardDescription className="text-xs">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>
          {(actions || onRemove) && (
            <div className="flex items-center gap-x-4">
              {actions}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem onClick={handleRemove}>
                      <TrashIcon className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
