import { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = useCallback(
    (page: number) => {
      return () => onPageChange(page);
    },
    [onPageChange],
  );

  const paginationItems = Array.from({ length: totalPages }, (_, i) => (
    <PaginationItem key={i}>
      <PaginationLink
        className="rounded-full"
        href="#"
        onClick={handlePageChange(i + 1)}
        isActive={currentPage === i + 1}
      >
        {i + 1}
      </PaginationLink>
    </PaginationItem>
  ));

  const previous = (
    <PaginationItem>
      <PaginationPrevious
        href="#"
        onClick={handlePageChange(Math.max(1, currentPage - 1))}
      />
    </PaginationItem>
  );

  const next = (
    <PaginationItem>
      <PaginationNext
        href="#"
        onClick={handlePageChange(Math.min(totalPages, currentPage + 1))}
      />
    </PaginationItem>
  );

  return (
    <Pagination className="mt-8 items-end">
      <PaginationContent>
        {previous}
        {paginationItems}
        {next}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
