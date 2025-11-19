import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

const getErrorMessage = (error: unknown) => {
  if (!error) return "Unknown error";
  if (typeof error === "string") return error;
  if (typeof error === "object") {
    if ("status" in (error as { status?: number })) {
      return `Request failed (${(error as { status?: number }).status ?? ""}).`;
    }
    if ("message" in (error as { message?: string })) {
      return (error as { message?: string }).message || "Unexpected error.";
    }
  }
  return "Something went wrong.";
};

const QueryState = ({
  isLoading,
  error,
  isEmpty,
  emptyMessage = "No data available.",
  children,
}: {
  isLoading?: boolean;
  error?: unknown;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress aria-label="Loading content" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {getErrorMessage(error)}
      </Alert>
    );
  }

  if (isEmpty) {
    return (
      <Stack spacing={1} alignItems="center" sx={{ py: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Stack>
    );
  }

  return <>{children}</>;
};

export default QueryState;
