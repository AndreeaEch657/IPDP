using Microsoft.EntityFrameworkCore.Migrations;

namespace CyberShop.Data.Migrations
{
    public partial class AddingAddressName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Orders",
                newName: "address");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "address",
                table: "Orders",
                newName: "Address");
        }
    }
}
