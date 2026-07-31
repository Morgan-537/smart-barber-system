import React from "react";

const AdminTable = ({
  title,
  subtitle,
  columns = [],
  children,
  emptyMessage = "No records found.",
}) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg">
      {(title || subtitle) && (
        <div className="border-b border-zinc-800 px-6 py-5">
          {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          {columns.length > 0 && (
            <thead className="bg-zinc-950/60 text-zinc-400">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-6 py-4 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody>
            {React.Children.count(children) > 0 ? (
              children
            ) : (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="px-6 py-8 text-center text-zinc-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;